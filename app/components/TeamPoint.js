import React, {Component} from 'react'

class TeamPoint extends Component{
    constructor(){
        super()

    }
    render(){
        const {image,x,y,datum} = this.props
        const teamPicture = <img src = {datum.image}/>
        console.log(teamPicture)
        return(
            <text x={x} y={y} fontSize={5}>
            {teamPicture}
          </text>
        )
    }
}

export default TeamPoint