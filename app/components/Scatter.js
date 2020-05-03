import React, {Component} from 'react'
import axios from 'axios'
import TeamPoint from './TeamPoint'
import { VictoryBar,VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine, VictoryScatter} from 'victory'


class Scatter extends Component {
    constructor(){
        super()
        this.state = {
            teamData: [],
            startYear: 2001,
            endYear: 2015
        }
this.handleChange = this.handleChange.bind(this)
    }
    async getThedata() {
        const res =  await axios.get('/api/payroll')
        const data = res.data
        this.setState({teamData: data})
    }


    getTheMoney(){

    }
    handleChange(event){
        console.log(event)
        console.log(event.target.className)
        const changeName = event.target.className
        const changeVal = event.target.value
        this.setState({[changeName] : changeVal})
    }
    componentDidMount(){
    this.getThedata()

    }

    render(){
        const relevantData = this.state.teamData.filter(el=>el.year<= this.state.endYear && el.year>=this.state.startYear)
        console.log(relevantData)
            return(
            <div>
            <VictoryChart 
            theme = {VictoryTheme.material}
            >
            
                <VictoryScatter
                    data = {relevantData.map(el=>{
                        return(
                            {
                                x: el.payroll,
                                y: el.wins,
                                image: el.imageUrl
                            }
                        )
                    })}
                   // dataComponent = {<TeamPoint/>}
                ></VictoryScatter>
            </VictoryChart>
                <div>
                    <h3>Start Year</h3>
                    <select className = 'startYear' label = "start year" value = {this.state.startYear} onChange = {this.handleChange}>
                        <option value = {2001}>2001</option>
                        <option value = {2002}>2002</option>
                        <option value = {2003}>2003</option>
                        <option value = {2004}>2004</option>
                        <option value = {2005}>2005</option>
                        <option value = {2006}>2006</option>
                        <option value = {2007}>2007</option>
                        <option value = {2008}>2008</option>
                        <option value = {2009}>2009</option>
                        <option value = {2010}>2010</option>
                        <option value = {2011}>2011</option>
                        <option value = {2012}>2012</option>
                        <option value = {2013}>2013</option>
                        <option value = {2014}>2014</option>
                        <option value = {2015}>2015</option>
                    </select>
                </div>
                <div>
                    <h3>End Year</h3>
                    <select className = 'endYear' value = {this.state.endYear} onChange = {this.handleChange}>
                        <option value = {2001}>2001</option>
                        <option value = {2002}>2002</option>
                        <option value = {2003}>2003</option>
                        <option value = {2004}>2004</option>
                        <option value = {2005}>2005</option>
                        <option value = {2006}>2006</option>
                        <option value = {2007}>2007</option>
                        <option value = {2008}>2008</option>
                        <option value = {2009}>2009</option>
                        <option value = {2010}>2010</option>
                        <option value = {2011}>2011</option>
                        <option value = {2012}>2012</option>
                        <option value = {2013}>2013</option>
                        <option value = {2014}>2014</option>
                        <option value = {2015}>2015</option>
                    </select>
                </div>
            </div>
            )
        

    }
}

export default Scatter