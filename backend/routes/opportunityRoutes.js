const express = require("express");
const router = express.Router();
const Opportunity = require("../models/opportunity");
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin');



/**
 * @swagger
 * tags:
 *   name: Opportunities
 *   description: API for managing opportunities
 */

/**
 * @swagger
 * /opportunities:
 *   get:
 *     summary: Get all opportunities with pagination
 *     tags: [Opportunities]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: A paginated list of opportunities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOpportunities:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 opportunities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Opportunity'
 */
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const opportunities = await Opportunity.find().skip(skip).limit(limit);
    const total = await Opportunity.countDocuments();

    res.json({
      totalOpportunities: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      opportunities,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /opportunities:
 *   post:
 *     summary: Create a new opportunity
 *     tags: [Opportunities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Opportunity'
 *     responses:
 *       201:
 *         description: The created opportunity
 *       400:
 *         description: Invalid input
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const data = {
      ...req.body,
      needs_approval: true,
      approved: false,
      approved_by: null,
    };

    const newOpportunity = new Opportunity(data);
    const saved = await newOpportunity.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /opportunities/pending - Get all unapproved opportunities
router.get("/pending", requireAuth, requireAdmin, async (req, res) => {
  try {
    const pendingOpportunities = await Opportunity.find({
      needs_approval: true, 
      approved: false, 
    });
    res.json(pendingOpportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/**
 * @swagger
 * /opportunities/search:
 *   get:
 *     summary: Search opportunities by title
 *     tags: [Opportunities]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title to search (case-insensitive, partial match allowed)
 *     responses:
 *       200:
 *         description: List of matched opportunities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Opportunity'
 *       500:
 *         description: Server error
 */
router.get("/search", async (req, res) => {
  const titleQuery = req.query.title;

  if (!titleQuery) {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    const opportunities = await Opportunity.find({
      title: { $regex: new RegExp(titleQuery, "i") }, // case-insensitive search
    });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /opportunities/{opportunityId}:
 *   get:
 *     summary: Get a specific opportunity by ID
 *     tags: [Opportunities]
 *     parameters:
 *       - in: path
 *         name: opportunityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the opportunity
 *     responses:
 *       200:
 *         description: Opportunity found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Opportunity'
 *       404:
 *         description: Opportunity not found
 */
router.get("/:opportunityId", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.opportunityId);
    if (!opportunity) return res.status(404).json({ error: "Opportunity not found" });
    res.json(opportunity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/**
 * @swagger
 * /opportunities/{opportunityId}:
 *   put:
 *     summary: Update an opportunity by ID
 *     tags: [Opportunities]
 *     parameters:
 *       - in: path
 *         name: opportunityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the opportunity to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Opportunity'
 *     responses:
 *       200:
 *         description: Opportunity updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Opportunity not found
 */

router.put("/:opportunityId", requireAuth, requireAdmin, async (req, res) => {
  try {
    const updates = {
      ...req.body,
      approved: true,
      needs_approval: false,
      approved_by: req.user?.name || 'Admin',
    };

    const updated = await Opportunity.findByIdAndUpdate(req.params.opportunityId, updates, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Opportunity not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



/**
 * @swagger
 * /opportunities/{opportunityId}:
 *   delete:
 *     summary: Delete an opportunity by ID
 *     tags: [Opportunities]
 *     parameters:
 *       - in: path
 *         name: opportunityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the opportunity to delete
 *     responses:
 *       200:
 *         description: Opportunity deleted
 *       404:
 *         description: Opportunity not found
 */
router.delete("/:opportunityId", requireAuth, async (req, res) => {
  try {
    const deleted = await Opportunity.findByIdAndDelete(req.params.opportunityId);
    if (!deleted) return res.status(404).json({ error: "Opportunity not found" });
    res.json({ message: "Opportunity deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
