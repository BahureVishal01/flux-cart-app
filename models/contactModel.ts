
import pool from "../db/db";

export async function addContacts(phone_number:string, email:string, linked_id:number, link_precedence:string) {
    let insertQuery = `INSERT INTO CONTACT (phone_number, email, link_precedence, linked_id) VALUES($1, $2, $3, $4) RETURNING contact_id`;
    let params = [phone_number, email, link_precedence, linked_id];
    let result = await pool.query(insertQuery, params);
    return result; 
};

export let getContacts= async(phone_number: string, email: string)=> {
    let getQuery: string;
    let result;
    let type: string; // Define and initialize the type variable
    
        getQuery = `select * from contact where email=$1 AND phone_number=$2`;
        result = await pool.query(getQuery, [email, phone_number]);
        type = "by_email_and_phone"; // Assign a value to type
      if(result.rowCount==0) {
        getQuery = `select * from contact where link_precedence='Primary' AND (phone_number=$1 OR email=$2)`;
        result = await pool.query(getQuery, [phone_number, email]);
        type = "by_phone_number"; // Assign a value to type
    }

    return { data: result, type: type }; // Return an object with data and type properties
}

export const getAllContacts = async(phone_number:string, email:string)=>{
      console.log("model", email, typeof email)
     let getQuery = `SELECT c.*, ARRAY(SELECT email FROM contact WHERE linked_id = c.contact_id) AS linked_emails, ARRAY(SELECT phone_number FROM contact WHERE linked_id = c.contact_id) AS phone_numbers, Array(select contact_id from contact where linked_id=c.contact_id AND contact_id<>c.contact_id) as secondary_contact_ids
     FROM contact c where  link_precedence='Primary' AND (($1::character varying IS NULL OR c.email = $1::character varying) AND ($2::character varying IS NULL OR c.phone_number =$2::character varying))`//OR c.phone_number=$2;
   
     let result = await pool.query(getQuery, [email, phone_number] );
     return result;
}

export const updatePrimaryContacts = async(phone_number:string, email:string)=>{
   let updateQuery1 = `UPDATE contact SET link_precedence='Primary' WHERE phone_number=$1 AND email=$2 RETURNING contact_id, linked_id`;
   let result1 = await pool.query(updateQuery1, [phone_number, email]);
   let updateQuery2 =`UPDATE contact SET linked_id=$1, link_precedence='Secondary' where contact_id=$2 returning contact_id`;
   let contact_id;
   let linked_id;

      if((result1?.rowCount ?? 0)>0){
        contact_id =result1.rows[0].contact_id
        linked_id = result1.rows[0].linked_id
      }
      console.log(contact_id, linked_id)
   let result2 = await pool.query(updateQuery2, [contact_id, linked_id]);
      
   return result2;
}
