import DataTable from "react-data-table-component";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal ,Form, Input, Slider} from "antd";

import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from "@ant-design/icons/lib/icons";
import "./LabTable.css";
const style = {
  border: "1px solid black",
  padding: "10px",
  borderRadius: "5px",
};

const LabTable = () => {
  const [labData, setLabData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterLabData, setFilterLabData] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [editingLab, setEditingLab] = useState(null);
  const getLabData = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v2/all");
      setLabData(response.data);
      setFilterLabData(response.data);
    } catch (error) {}
  };

  const onDeleteLab = (lab) => {
    Modal.confirm({
      title: "Do you really want to delet lab" + lab.name + "?",
      okText: "YES",
      okType: "danger",
      onOk: () => {
        //call delete API
      },
    });
  };

  const editLabDetails = (labDetails) => {
    setIsEditing(true);
    setEditingLab({ ...labDetails });
  };

  const createLabDetails = () => {
    setIsEditing(true);
  };

  const columns = [
    {
      name: "Lab Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.alpha2Code,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Phone",
      selector: (row) => row.alpha3Code,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Email",
      selector: (row) => row.callingCodes,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Pincode",
      selector: (row) => row.callingCodes,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Ownername",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Today's appoinment",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Logo",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Is deleted ",
      selector: (row) => row.name,
      sortable: true,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <EditOutlined
            onClick={() => {
              editLabDetails(row);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              onDeleteLab(row);
            }}
            style={{ color: "red", marginLeft: "20px" }}
          />
        </div>
        // <Button type="primary" onClick={() => alert(row.name)}>
        //   Edit
        // </Button>
      ),
      style: {
        fontWeight: "bold",
      },
    },
  ];

  useEffect(() => {
    getLabData();
  }, []);

  useEffect(() => {
    const result = labData.filter((labData) => {
      return labData.name.match(search);
    });
    setFilterLabData(result);
  }, [search]);

  const updaetLabDetails = () => {
    alert("success");
  };
  return (
    <div className=" ">
      <header></header>
      <DataTable
        className="container headerStyles"
        title="LAB DETAILS"
        columns={columns}
        data={filterLabData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        actions={
          <div>
            <ExportOutlined>
              <Button>Export</Button>
            </ExportOutlined>

            <Button
              style={{ marginLeft: "20px" }}
              type="primary"
              onClick={() => {
                editLabDetails();
              }}
            >
              Create New Lab
            </Button>
          </div>
        }
        subHeaderComponent={
          <input
            className="w-25 form-control"
            type="text"
            placeholder="Search Here"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        }
        subHeader
        
      />

      <Modal
        title="Edit Lab:"
        visible={isEditing}
        onCancel={() => {
          setIsEditing(false);
        }}
        onOk={() => {
          updaetLabDetails();
          setIsEditing(false);
        }}
      >
        <div>

        <Form
      
      name="registration_form"
      
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Name"
        name="name"
        initialValue={editingLab?.name}
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Adress"
        name="Adress"
        initialValue={editingLab?.topLevelDomain}
        rules={[
          { required: true, message: 'Please enter your adress' },
          { type: 'email', message: 'Please enter a valid adress' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        initialValue={editingLab?.alpha2Code}
        rules={[
          { required: true, message: 'Please enter a password' },
          { min: 6, message: 'Password must be at least 6 characters long' },
        ]}
        
         
      >
       <Input.Password />
      </Form.Item>
      
       <Form.Item
        label="Email"
        name="email"
        initialValue={editingLab?.alpha3Code}
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
         <Input />
      </Form.Item>

      <Form.Item
        label="Pincode"
        name="Pincode"
        initialValue={editingLab?.callingCodes}
        rules={[
          { required: true, message: 'Please enter your Pincode' },
          { type: 'pincode', message: 'Please enter a valid Pincode' },
        ]}
      >
         <Input />
      </Form.Item>

      <Form.Item
        label="Ownername"
        name="Ownername"
        initialValue={editingLab?.capital}
        rules={[
          { required: true, message: 'Please enter your name' },
          { type: 'name', message: 'Please enter a valid name' },
        ]}
      >
         <Input />
      </Form.Item>

      <Form.Item
        label="Logo"
        name="Logo"
        initialValue={editingLab?.altSpellings}
        rules={[
          { required: true, message: 'Please enter your logo' },
          { type: 'logo', message: 'Please enter a valid logo' },
        ]}
      >
     <Input />
      </Form.Item>

      <Form.Item
        label="Is deleted"
        name="Is deleted"
        initialValue={editingLab?.subregion}
        rules={[
          { required: true, message: 'deleted' },
          { type: 'delete', message: 'deleted' },
        ]}
      > <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update Lab Details
        </Button>
        
      </Form.Item>
    </Form>
        </div>
npm      </Modal>

      <Modal
        title="Edit Lab:"
        visible={isCreate}
        onCancel={() => {
          setIsCreate(false);
        }}
        onOk={() => {
          updaetLabDetails();
          setIsCreate(false);
        }}
      >
        <input placeholder="lab name" />
      </Modal>
    </div>
  );
};

export default LabTable;
