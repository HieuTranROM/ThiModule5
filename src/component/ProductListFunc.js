import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import * as productService from "../../service/ProductService"

function StudentListFunc() {
    const [products, setProdcuts] = useState([]);
    const [name, setName] = useState("");

    useEffect (() => {

        getAllProducts(name)
    }, [name])

    useEffect(() => {
        return () => {

        }
    }, [])

    const getAllProducts = async (name) => {
        let res = await productService.getAllProducts(name);
        setProducts(res)
    }

    return (
        <>

            <Link to="/create">Thêm mới</Link>

            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <table>
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Thể loại</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Ngày nhập</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((item, index) =>
                        <tr key={item.id}>
                            <td>{index}</td>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.category.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.date}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </>
    )
}

export default StudentListFunc;