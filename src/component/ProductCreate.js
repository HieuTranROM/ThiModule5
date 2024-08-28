import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as studentService from "../../service/StudentService";
import * as classroomService from "../../service/ClassroomService";

function StudentCreate({ students, setStudents }) {
    const [form, setForm] = useState({
        name: "",
        address: "",
        point: 0,
        classroom: ""
    });

    const [classrooms, setClassrooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllClassroom();
    }, []);

    const getAllClassroom = async () => {
        const temp = await classroomService.getClassrooms();
        console.log(temp);
        setClassrooms(temp);
    };

    const objectValid = {
        name: Yup.string()
            .required("Tên không được để trống")
            .min(3, "Tên không được ngắn hơn 3 ký tự"),
        classroom: Yup.string().required("ABC")
    };

    const saveStudent = async (value) => {
        value.classroom = JSON.parse(value.classroom);
        value.point = +value.point;
        const success = await studentService.saveStudent(value);
        if (success) {
            setStudents([...students, value]);
            toast.success("Thêm mới thành công");
            navigate("/student");
        } else {
            toast.error("Thêm mới thất bại");
        }
    };

    return (
        <Formik
            initialValues={form}
            onSubmit={saveStudent}
            validationSchema={Yup.object(objectValid)}
        >
            <Form className="form-horizontal p-4 bg-light border rounded mx-auto" style={{ maxWidth: "400px" }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <Field name="name" className="form-control" />
                    <ErrorMessage name="name" component="p" className="text-danger" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <Field name="address" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="point" className="form-label">Point:</label>
                    <Field name="point" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="classroom" className="form-label">Classroom:</label>
                    <Field name="classroom" as="select" className="form-control">
                        <option value="">Chọn lớp</option>
                        {classrooms.map((item) =>
                            <option key={item.id} value={JSON.stringify(item)}>
                                {item.name}
                            </option>
                        )}
                    </Field>
                </div>
                <button type="submit" className="btn btn-primary w-50 mx-auto d-block">Lưu</button>
            </Form>
        </Formik>
    );
}

export default StudentCreate;
