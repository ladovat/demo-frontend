import React, { useState, useEffect } from 'react';
import axios from "axios";
import MaterialTable from "material-table";

export const Table_Material = () => {

    const [persons, setPersons] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        const customData2 = axios.get("/api/v1/person/get_all")
            .then(res => {
                console.log(res.data);
                setPersons(res.data);
            })
            .catch(error => {
                setErrorMessages(["Cannot load user data"]);
            });
    }, []);

    const customColumns = [
        {
            title: 'ID', field: 'id', hidden: true,
        },
        {
            title: 'Name', field: 'name'
        },
        {
            title: 'Age', field: 'age'
        }
    ]

    const handleRowAdd = (newData, resolve) => {
        axios.post("/api/v1/person/add", newData)
            .then(res => {
                newData.id = res.data; // hack -> set ID from the response
                let dataToAdd = [...persons];
                dataToAdd.push(newData);
                setPersons(dataToAdd);
                resolve()
            })
    }

    const handleRowDelete = (oldData, resolve) => {
        axios.delete("/api/v1/person/delete", { params: { id: oldData.id } })
            .then(res => {
                const dataDelete = [...persons];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setPersons([...dataDelete]);
                resolve();
            })
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        axios.put("/api/v1/person/update", newData)
            .then(res => {
                const dataUpdate = [...persons];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setPersons([...dataUpdate]);
                resolve();
            })
    }

    return (
        <div>
            <MaterialTable title="Persons"
                data={persons}
                columns={customColumns}
                options={{
                    search: false,
                    exportButton: true,
                    actionsColumnIndex: -1,
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
            />
        </div>
    )
}