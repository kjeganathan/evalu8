import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import './attendanceModalItem.css';
import AttendanceTableMember from './attendaceTableMembers.js';

const AttendanceModalItem = (props) => {
    let element = "";
    let elementArr = [];
    let dates = ["2022/01/04", "2022/01/11", "2022/01/21"];
    let count = 1;
    dates.forEach((date) => {
        console.log(date);
        element = (
        <Collapsible id="meeting-list" trigger={"Meeting " + count + ": " + date}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
              <AttendanceTableMember></AttendanceTableMember>
              {/* Taking code from here */}
            {/* <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Present"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Absent"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Excused"
                        name="group1"
                        type={type}
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td><Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Present"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Absent"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Excused"
                        name="group1"
                        type={type}
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                </Form></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry</td>
              <td>Bird</td>
              <td><Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Present"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Absent"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Excused"
                        name="group1"
                        type={type}
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                </Form></td>
            </tr> */}
          </tbody>
        </Table>
      </Collapsible>
      );
      elementArr.push(element);
      count++;
      console.log(elementArr);
    }
    );

    return (elementArr);
}

export default AttendanceModalItem;