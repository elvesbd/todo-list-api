import { SwaggerCustomOptions } from '@nestjs/swagger';

export const customOptions: SwaggerCustomOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
  customSiteTitle: 'Api-aprovame',
  customfavIcon: '',
  customCss: `
    img[alt="Swagger UI"] { 
      display: block;
      -moz-box-sizing: border-box; 
      box-sizing: border-box; 
      content: url("https://i.imgur.com/2uSkYt5.png"); 
      max-width: 100%; 
      max-height: 100%; 
    } 

    .swagger-ui .topbar { 
      background-color: #3f50b5; /* Primary Main */
      padding: 10px 0;
    } 

    .swagger-ui .topbar .wrapper { 
      background-color: #3f50b5; /* Primary Main */
    } 

    .swagger-ui .info>div { 
      margin: 0 0 5px; 
    } 

    .swagger-ui .info .main .title { 
      font-family: "Montserrat", sans-serif; 
      font-size: 36px; 
      margin: 0; 
      color: #fff; /* Contrast Text */
      background-color: #3f50b5; /* Primary Main */
    } 

    .swagger-ui .info .title span small { 
      background-color: #757ce8; /* Primary Light */
    } 

    .swagger-ui .info .title span small.version-stamp { 
      background-color: #757ce8; /* Primary Light */
    } 

    .swagger-ui .wrapper { 
      box-sizing: border-box;
      margin: 0 auto;
      max-width: 1460px;
      padding: 0 20px; 
      width: 100%; 
      background-color: #fff;
    } 

    .swagger-ui .btn.authorize { 
      background-color: #757ce8; /* Primary Light */
      border-color: #002884; /* Primary Dark */
      color: #fff; /* Contrast Text */
      display: inline; 
      line-height: 1; 
    } 

    .swagger-ui .btn.authorize svg { 
      fill: #002884; /* Primary Dark */
    }
  `,
};
