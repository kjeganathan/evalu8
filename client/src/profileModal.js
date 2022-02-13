import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";


const ProfileModal = (props) => {
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Profile Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
            <div id="profile-form-modal">
            <h3 className="profile-subheader">Update Your Repository Details</h3>
                    <form>
                    <h6 className="profile-subheader">Change to a Different Repository</h6>
                        <div id="github-change-reponame-form" className="form-group">
                          <label for="reponame">Change Repository</label>
                          <input name="reponame" type="text" className="form-control" id="reponame" placeholder="Enter New Repository Name"/> 
                        </div>
                        <div className="reponame-Button">
                          <button id="reponame-Button" type="submit" className="btn btn-dark">Update</button>
                        </div>
                </form>

                <form>
                    <h6 className="profile-subheader">Update your Github Token</h6>
                        <div id="github-change-reponame-form" className="form-group">
                          <label for="token">Update Token</label>
                          <input name="token" type="text" className="form-control" id="token" placeholder="Enter Updated Token"/> 
                        </div>
                        <div className="token-Button">
                          <button id="token-Button" type="submit" className="btn btn-dark">Update</button>
                        </div>
                </form>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default ProfileModal