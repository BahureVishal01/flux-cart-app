CREATE TABLE CONTACT (
    contact_id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20),
    email VARCHAR(100),
    linked_id INTEGER,
    link_precedence VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP 
);