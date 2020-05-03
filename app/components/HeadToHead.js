import React, {Component} from 'react'
import axios from 'axios'
import TeamPoint from './TeamPoint'
import { VictoryBar,VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine, VictoryScatter} from 'victory'


class HeadToHead extends Component {
    constructor(){
        super()
        this.state = {
            teamData: [],
            startYear: 2001,
            endYear: 2015,
            teamOne: "LAD",
            teamTwo: "NYY"
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
        const changeName = event.target.className
        const changeVal = event.target.value
        this.setState({[changeName] : changeVal})
        console.log(this.state)
    }
    componentDidMount(){
    this.getThedata()

    }

    render(){
        console.log(this.state.teamData.length)
        if(this.state.teamData.length !== 0){
            const relevantData = this.state.teamData.filter(el=>el.year<= this.state.endYear && el.year>=this.state.startYear)
            const teamOne = relevantData.filter(el=>el.team=== this.state.teamOne)
            let teamOneCount = 0
            teamOne.forEach(el=>
                teamOneCount += el.payroll)
            teamOneCount = teamOneCount/teamOne.length
            const teamTwo = relevantData.filter(el=> el.team === this.state.teamTwo)
            let teamTwoCount = 0
            teamTwo.forEach(el=>
                teamTwoCount+= el.payroll)
            teamTwoCount = teamTwoCount/teamTwo.length
            let displayData =[]
            if(teamOneCount >= teamTwoCount){
                 displayData = [{team:this.state.teamOne,payroll:teamOneCount,expensive: true},{team:this.state.teamTwo, payroll:teamTwoCount, expensive: false}]

            }
            else{
                 displayData = [{team:this.state.teamOne,payroll:teamOneCount, expensive:false},{team:this.state.teamTwo, payroll:teamTwoCount,expensive:true}]
            }
            console.log(displayData)

            return(
            <div>
            <VictoryChart 
            theme = {VictoryTheme.material}
            domainPadding = {50}
            >
                <VictoryAxis
                    tickValues = {[this.state.teamOne, this.state.teamTwo]}
                    style = {{
                        tickLabels: {
                            width: 30,
                            fontSize: 6,
                            padding: 5,
                            margin:5
                        }
                    }}

                    axisLabelComponent= {<VictoryLabel dy = {15}/>}
                    label ="Teams"  
                />
                <VictoryAxis
                    dependentAxis
                    axisLabelComponent= {<VictoryLabel dy = {-30}/>}
                    label = "Payroll (Millions)"   
                />
            
                <VictoryBar
                    style={{
                        data:{
                             fill:({datum})=>datum.expensive === true ? "#c43a31" : "#1C77C3" 
                        }
                    }}
                    data = {displayData.map(el=>{
                        return(
                            {
                                x: el.team,
                                y: el.payroll,
                                image: el.imageUrl,
                                expensive: el.expensive
                            }
                        )
                    })}
                    labels={({ datum }) => datum.y}

                   // dataComponent = {<TeamPoint/>}
                />
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
                <div>
                    <h3>Start Year</h3>
                    <select className = 'teamOne' value = {this.state.teamOne} onChange = {this.handleChange}>
                        <option value = {"LAD"}>LAD</option>
                        <option value = {"DET"}>DET</option>
                        <option value = {"BOS"}>BOS</option>
                        <option value = {"WSN"}>WSN</option>
                        <option value = {"NYY"}>NYY</option>
                    </select>
                </div>
                <div>
                    <h3>Team Two</h3>
                    <select className = 'teamTwo' value = {this.state.teamTwo} onChange = {this.handleChange}>
                        <option value = {"LAD"}>LAD</option>
                        <option value = {"DET"}>DET</option>
                        <option value = {"BOS"}>BOS</option>
                        <option value = {"WSN"}>WSN</option>
                        <option value = {"NYY"}>NYY</option>
                    </select>
                </div>
            </div>
            )
        
        }
        else{
            return <h1>loading</h1>
        }

    }
}

export default HeadToHead