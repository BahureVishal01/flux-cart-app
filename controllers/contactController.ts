import {addContacts, getAllContacts, getContacts, updatePrimaryContacts} from '../models/contactModel';
// contactController.ts



import { Request, Response, NextFunction } from 'express';

export let addNewContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let { phone_number, email } = req.body;
        let linked_id: any = null;
        let link_precedence: string = 'Primary';
        let oldData = await getContacts(phone_number, email);
        console.log(oldData.type, "ssssssss\n")
        console.log(oldData.data.rowCount)
        if(oldData.type == 'by_email_and_phone' && (oldData?.data?.rowCount ?? 0)>0){
              res.status(200).json({
                success: false,
                message : "Contact details are allready available"
            })
            return;
        } else if(oldData.type == 'by_phone_number' && (oldData?.data?.rowCount ?? 0)>0){
            linked_id = oldData?.data?.rows[0]?.contact_id
            link_precedence = 'Secondary';
        }
        let newData = await addContacts(phone_number, email, linked_id, link_precedence); // Call addContacts function
        if (newData.rowCount) {
            res.status(201).json({
                success: true,
                message: "New Contact is added successfully."
            });
            return;
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to add contacts"
            });
            return;
        }
    } catch (error) {
        console.error('Error adding contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export let identifiedContacts = async(req:Request, res:Response, next: NextFunction): Promise<void> =>{
  
    const phone_number:any = req.query.phone_number;
    const email:any= req.query.email;
    
    try {
       console.log(phone_number, typeof email)
        let data = await getAllContacts(phone_number, email);
        if((data?.rowCount ?? 0)>0){
            res.status(200).json({success: true, data: data.rows}) 
            return;
        }else{
            res.status(404).json({
                success: false,
                message : "Contact details not found"
            })
        }
         
    } catch (error:any) {
        console.log(error.message)
    }
}

export const updatePrimaryContactDetails = async(req:Request, res:Response): Promise<void> =>{
    const phone_number = req.body.phone_number
    const email = req.body.email
    try {
         if(!phone_number && !email){
             res.status(400).json({
                success : false,
                message : "Please provied all fields"
             })
             return;
         }

       let updatedContacts = await updatePrimaryContacts(phone_number, email);
       console.log("updatedContacts", updatedContacts.rows)
       if((updatedContacts?.rowCount ??0)>0){
        res.status(200).json({
            success : true,
            message : "Primary contact updated",
            data : updatedContacts.rows
        })
       }else{
        res.status(404).json({
            success : false,
            message : "failed to update Primary contacts"
        })
       }
    } catch (error:any) {
        console.log(error.message)
        res.status(500).json({
            success: false,
            message : "Some internal Server Error",
            error: error.message
        })
    }

}