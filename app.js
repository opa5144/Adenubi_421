   // app.js
   const express = require('express');
   const swaggerUi = require('swagger-ui-express');
   const swaggerJSDoc = require('swagger-jsdoc');

   const app = express();
   app.use(express.json());
   const port = 3000;

   const mongoose = require('mongoose');
   // MongoDB Connection
    mongoose.connect('mongodb://localhost/mydatabase', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
    });

   // Swagger definition
   const swaggerOptions = {
       swaggerDefinition: {
           openapi: '3.0.0',
           info: {
               title: 'Adenubi_421',
               version: '1.0.0',
               description: 'API documentation using Swagger',
           },
           servers: [
               {
                   url: `http://localhost:${port}`,
               },
           ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', 
            },
        },
    },
       },
       apis: ['./routes/*.js'], // Path to your API docs
   };


   const swaggerDocs = swaggerJSDoc(swaggerOptions);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
   
   const customerRoutes = require('./routes/customers');
   app.use('/customers', customerRoutes);

   const orderRoutes = require('./routes/orders');
   app.use('/orders', orderRoutes);

   const paymentRoutes = require('./routes/payments');
   app.use('/payments', paymentRoutes);

   app.listen(port, () => {
       console.log(`Server running at http://localhost:${port}`);
   });