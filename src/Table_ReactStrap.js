import React from 'react';
import ServerTable from 'react-strap-table';

export const Table_ReactStrap = () => {
    const url = 'http://localhost:8080/api/v1/person/get_all';
    const columns = ['id', 'name'];
    const options = {  
    headings: {id: '#', created_at: 'Created At'},  
    sortable: ['name', 'email']  
    };  

    return (  
        <ServerTable 
            columns={columns}  
            
            url={url}  
            options={options} 
            bordered hover
        />  
    );
}