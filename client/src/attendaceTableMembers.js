import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const AttendanceTableMember = (props) => {
    let member = "";
    let memberArr = [];
    let teamMembers = ["Jane Dore", "Josh Hase", "Derek Hawks", "Rayne Masters", "Tez Martinez",
"Naomi Reid", "Eric Anderson", "Dayton Peerson", "Lucy Lu", "Jackie Lester"];
    let count = 1;
    teamMembers.forEach((teamMember) => {
        member = (
            <tr>
              <td>{count}</td>
              <td>{teamMember}</td>
              <td>{teamMember + "@gmail.com"}</td>
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
        );
        memberArr.push(member);
        count++;
    });
    return (memberArr);
}

export default AttendanceTableMember;