const express = require("express");
const router = express.Router();
const Major = require("../models/majors");

/**
 * @swagger
 * tags:
 *   name: Majors
 *   description: API for managing majors
 */

/**
 * @swagger
 * /majors:
 *   get:
 *     summary: Get all majors (paginated)
 *     tags: [Majors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of majors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalMajors:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 majors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Major'
 */
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const majors = await Major.find().skip(skip).limit(limit);
    const total = await Major.countDocuments();

    res.json({
      totalMajors: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      majors,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /majors:
 *   post:
 *     summary: Create a new major
 *     tags: [Majors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Major'
 *     responses:
 *       201:
 *         description: Major created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", async (req, res) => {
  try {
    const newMajor = new Major(req.body);
    const saved = await newMajor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /majors/{id}:
 *   get:
 *     summary: Get a specific major by ID
 *     tags: [Majors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Major ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Major details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Major'
 *       404:
 *         description: Major not found
 */
router.get("/:id", async (req, res) => {
  try {
    const major = await Major.findById(req.params.id);
    if (!major) return res.status(404).json({ error: "Major not found" });
    res.json(major);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /majors/{id}:
 *   put:
 *     summary: Update a major by ID
 *     tags: [Majors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Major ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Major'
 *     responses:
 *       200:
 *         description: Updated major
 *       400:
 *         description: Invalid input
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Major.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /majors/{id}:
 *   delete:
 *     summary: Delete a major by ID
 *     tags: [Majors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Major ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Major deleted
 *       500:
 *         description: Server error
 */
router.delete("/:id", async (req, res) => {
  try {
    await Major.findByIdAndDelete(req.params.id);
    res.json({ message: "Major deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
