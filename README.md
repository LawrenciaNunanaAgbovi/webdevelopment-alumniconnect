[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/I3LuwWFf)



Project2
Name: Lawrencia Agbovi

Due Date: May 2nd, 2025

Public server IP: 138.197.93.75

Link to Swagger docs: http://138.197.93.75/api-docs

Link to deployed frontend: http://138.197.93.75


Screenshot is in the assest folder



1. I am able to login and sign up as a user and admin (role)
2. When you signup as User, the user needs to be approved first before you are able to login
3. When you signup as admin you are automatically approved and can login
4. Admin: a. Can view users, opportunities and profile 
b. Can view Admin Panel
c. Can approve new users and opportunities
5. User: Can only view users, opportunities and profile
6. Users can send messages to each other
7. Users can logout


Working admin login: Email: again@gmail.com
Password: 12345

Working user login: Email: newuser@example.com
Password: testpassword

working user signup: email: test5@gmail.com
password: 12345

8. When logging in or Signing up choose role
9. Fixed Pagination from assignment3
10. Deployed successfully on DigitalOcean using `pm2` and `nginx`.

11. user can reply

cd ~/project-2/project-2-LawrenciaNunanaAgbovi/backend
cd ~/project-2/project-2-LawrenciaNunanaAgbovi/frontend
pm2 logs backend
pm2 restart backend
npm run build
sudo cp -r dist/* /var/www/project-2/
sudo chown -R www-data:www-data /var/www/project-2
sudo systemctl reload nginx
pm2 restart backend --update-env

pm2 restart ecosystem.config.js --update-env
