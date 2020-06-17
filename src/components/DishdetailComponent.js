import React, {Component} from 'react';
import { Button,  Card, CardImg, CardText, CardBody,CardTitle, BreadcrumbItem, Breadcrumb,
     Label, Modal, ModalHeader, ModalBody  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => !(val) || (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        console.log("Current state is:" +JSON.stringify(values));
        alert("Current state is:" +JSON.stringify(values));
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
            <>
                <div>
                    <Button type="submit" className="btn btn-outline-secondary" onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                </div>
                <Modal isOpen={this. state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}> Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="name">Name</Label>
                                <Control.text model=".name" id="name" name="name" className="form-control" 
                                validators={{
                                    minLength: minLength(3), maxLength: maxLength(15)
                                }}/>
                                <Errors 
                                    className="text-danger" 
                                    model=".name" 
                                    show="touched" 
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 character or less'
                                    }} />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="6"
                                    className="form-control"/>
                            </div>
                            <Button type="submit" value="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}


    function RenderDish({dish}) {
        if (dish != null) {
            return(
                <Card >
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else {
            return (
                <div></div>
            );
        }
    };

   function RenderComments({comments}) {
       console.log(comments);
        if(comments != null){
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((comment) => {
                            return (
                                <li key={comment.id}>
                                    <p>
                                        {comment.comment}
                                    </p>
                                    <p>
                                        --{comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </p>
                                </li>
                            )
                        })};
                    </ul>
                </div>
            )
        }else {
            return (
                <div></div>
            );
        }
    }


    const DishDetail = (props) => {
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 mt-1">
                    <RenderDish dish={props.dish}/>
                </div>
                <div className="col-12 col-md-5 mt-1">
                    <RenderComments comments={props.comments}/>
                    <CommentForm />
                </div>
            </div>
            </div>
        )
    }




export default DishDetail;