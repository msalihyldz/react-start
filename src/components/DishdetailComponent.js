import React, {Component} from 'react';
import { Button,  Card, CardImg, CardText, CardBody,CardTitle, BreadcrumbItem, Breadcrumb,
     Label, Modal, ModalHeader, ModalBody  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


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
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
            <div>
                <Button type="submit" className="btn btn-outline-secondary" onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
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
                            <Label htmlFor="author">Name</Label>
                            <Control.text model=".author" id="author" name="author" className="form-control" 
                            validators={{
                                minLength: minLength(3), maxLength: maxLength(15)
                            }}/>
                            <Errors 
                                className="text-danger" 
                                model=".author" 
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
            </div>
        );
    }
}


    function RenderDish({dish}) {
        return(
            <Card >
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
        
    };

   function RenderComments({comments, addComment, dishId}) {
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
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            )
        }else {
            return (
                <div></div>
            );
        }
    }


    const DishDetail = (props) => {
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if (props.dish != null) {
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
                        <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}/>
                    </div>
                </div>
                </div>
            )
        } else {
            return (
                <div></div>
            );
        }
    }




export default DishDetail;