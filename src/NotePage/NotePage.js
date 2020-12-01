import React, { Component } from 'react';
import { Link } from 'react-router-dom';

 class NotePage extends Component {
     render(){
         const noteItem = this.props.notePageData.find(p =>
            p.id === this.props.match.params.noteID
          )

        console.log(this.props.match.params.noteID)

        return(
            <div>
                <h2>{noteItem.name}</h2>
                <p>{noteItem.content}</p>
                <Link to='/'>
                    <button>Go Back</button>
                </Link>
            </div>
        )

    }
}

export default NotePage