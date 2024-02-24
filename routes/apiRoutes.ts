import express, {Request, Response} from 'express';

const router:express.Router = express.Router();

import {addNewContacts, identifiedContacts, updatePrimaryContactDetails} from '../controllers/contactController';


router.post('/addNewContact', addNewContacts)
router.get('/identify', identifiedContacts)
router.put('/updatePrimaryContact', updatePrimaryContactDetails)
// router.get('/me', (request:Request, response:Response)=>{
//     response.status(200).send(`<h3>Hello Anshu <h3>`);
// });

 export default router;