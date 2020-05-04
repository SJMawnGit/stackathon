import React, {Component} from 'react'
import axios from 'axios'
import TeamPoint from './TeamPoint'
import { VictoryBar,VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine, VictoryScatter,VictoryTooltip} from 'victory'


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
this.payrollComp = this.payrollComp.bind(this)
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

    payrollComp(){
        const relevantData = this.state.teamData.filter(el=>el.year<= this.state.endYear && el.year>=this.state.startYear)
            const teamOne = relevantData.filter(el=>el.team=== this.state.teamOne)
            let teamOneCount = 0
            teamOne.forEach(el=>
                teamOneCount += el.payroll)
            teamOneCount = Math.round(teamOneCount/teamOne.length)
            const teamTwo = relevantData.filter(el=> el.team === this.state.teamTwo)
            let teamTwoCount = 0
            teamTwo.forEach(el=>
                teamTwoCount+= el.payroll)
            teamTwoCount = Math.round(teamTwoCount/teamTwo.length)
            let displayData =[]
            if(teamOneCount >= teamTwoCount){
                 displayData = [{team:this.state.teamOne,payroll:teamOneCount,expensive: true},{team:this.state.teamTwo, payroll:teamTwoCount, expensive: false}]
                return displayData
            }
            else{
                 displayData = [{team:this.state.teamOne,payroll:teamOneCount, expensive:false},{team:this.state.teamTwo, payroll:teamTwoCount,expensive:true}]
                return displayData    
            }
    }
    winsComp(){
        const relevantData = this.state.teamData.filter(el=>el.year<= this.state.endYear && el.year>=this.state.startYear)
            const teamOne = relevantData.filter(el=>el.team=== this.state.teamOne)
            let teamOneCount = 0
            teamOne.forEach(el=>
                teamOneCount += el.wins)
            teamOneCount = Math.round(teamOneCount/teamOne.length)
            const teamTwo = relevantData.filter(el=> el.team === this.state.teamTwo)
            let teamTwoCount = 0
            teamTwo.forEach(el=>
                teamTwoCount+= el.wins)
            teamTwoCount = Math.round(teamTwoCount/teamTwo.length)
            let displayData =[]
            if(teamOneCount >= teamTwoCount){
                 displayData = [{team:this.state.teamOne,wins:teamOneCount,better: true},{team:this.state.teamTwo, wins:teamTwoCount, better: false}]
                return displayData
            }
            else{
                 displayData = [{team:this.state.teamOne,wins:teamOneCount, better:false},{team:this.state.teamTwo, wins:teamTwoCount,better:true}]
                return displayData    
            }
    }
    componentDidMount(){
    this.getThedata()

    }

    render(){
        console.log(this.state.teamData.length)
        if(this.state.teamData.length !== 0){
            // const relevantData = this.state.teamData.filter(el=>el.year<= this.state.endYear && el.year>=this.state.startYear)
            // const teamOne = relevantData.filter(el=>el.team=== this.state.teamOne)
            // let teamOneCount = 0
            // teamOne.forEach(el=>
            //     teamOneCount += el.payroll)
            // teamOneCount = Math.round(teamOneCount/teamOne.length)
            // const teamTwo = relevantData.filter(el=> el.team === this.state.teamTwo)
            // let teamTwoCount = 0
            // teamTwo.forEach(el=>
            //     teamTwoCount+= el.payroll)
            // teamTwoCount = Math.round(teamTwoCount/teamTwo.length)
            // let displayData =[]
            // if(teamOneCount >= teamTwoCount){
            //      displayData = [{team:this.state.teamOne,payroll:teamOneCount,expensive: true},{team:this.state.teamTwo, payroll:teamTwoCount, expensive: false}]

            // }
            // else{
            //      displayData = [{team:this.state.teamOne,payroll:teamOneCount, expensive:false},{team:this.state.teamTwo, payroll:teamTwoCount,expensive:true}]
            // }
            // console.log(displayData)
            const yearData = this.state.teamData.filter(el=>el.year<= this.state.endYear && el.year>=this.state.startYear)
            const relevantData = yearData.filter(el=>el.team === this.state.teamOne || el.team === this.state.teamTwo)
            const displayData = this.payrollComp()
            const displayDataWins = this.winsComp()
            const titleOne = `Average Annual Payroll for selected teams from ${this.state.startYear}-${this.state.endYear}`
            const titleTwo = `Average wins per season for selected teams from ${this.state.startYear}-${this.state.endYear}`
            const titleThree = `wins vs. payroll for selected teams from ${this.state.startYear}-${this.state.endYear}`

            return(
            <div>
                <div className = "parameterBox">
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
                        <h3>Team One</h3>
                        <select className = 'teamOne' value = {this.state.teamOne} onChange = {this.handleChange}>
                            <option value = {"LAD"}>LAD</option>
                            <option value = {"DET"}>DET</option>
                            <option value = {"BOS"}>BOS</option>
                            <option value = {"WSN"}>WSN</option>
                            <option value = {"NYY"}>NYY</option>
                            <option value = {"ARI"}>ARI</option>
                            <option value = {"HOU"}>HOU</option>
                            <option value = {"TBD"}>TBD</option>
                            <option value = {"OAK"}>OAK</option>
                            <option value = {"MIA"}>MIA</option>
                            <option value = {"SFG"}>SFG</option>
                            <option value = {"LAA"}>LAA</option>
                            <option value = {"TEX"}>TEX</option>
                            <option value = {"PHI"}>PHI</option>
                            <option value = {"SDP"}>SDP</option>
                            <option value = {"SEA"}>SEA</option>
                            <option value = {"STL"}>STL</option>
                            <option value = {"BAL"}>BAL</option>
                            <option value = {"CIN"}>CIN</option>
                            <option value = {"CHC"}>CHC</option>
                            <option value = {"TOR"}>TOR</option>
                            <option value = {"KCR"}>KCR</option>
                            <option value = {"CHW"}>CHW</option>
                            <option value = {"MIN"}>MIN</option>
                            <option value = {"NYM"}>NYM</option>
                            <option value = {"MIL"}>MIL</option>
                            <option value = {"COL"}>COL</option>
                            <option value = {"ATL"}>ATL</option>
                            <option value = {"CLE"}>CLE</option>
                            <option value = {"PIT"}>PIT</option>
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
                            <option value = {"ARI"}>ARI</option>
                            <option value = {"HOU"}>HOU</option>
                            <option value = {"TBD"}>TBD</option>
                            <option value = {"OAK"}>OAK</option>
                            <option value = {"MIA"}>MIA</option>
                            <option value = {"SFG"}>SFG</option>
                            <option value = {"LAA"}>LAA</option>
                            <option value = {"TEX"}>TEX</option>
                            <option value = {"PHI"}>PHI</option>
                            <option value = {"SDP"}>SDP</option>
                            <option value = {"SEA"}>SEA</option>
                            <option value = {"STL"}>STL</option>
                            <option value = {"BAL"}>BAL</option>
                            <option value = {"CIN"}>CIN</option>
                            <option value = {"CHC"}>CHC</option>
                            <option value = {"TOR"}>TOR</option>
                            <option value = {"KCR"}>KCR</option>
                            <option value = {"CHW"}>CHW</option>
                            <option value = {"MIN"}>MIN</option>
                            <option value = {"NYM"}>NYM</option>
                            <option value = {"MIL"}>MIL</option>
                            <option value = {"COL"}>COL</option>
                            <option value = {"ATL"}>ATL</option>
                            <option value = {"CLE"}>CLE</option>
                            <option value = {"PIT"}>PIT</option>
                        </select>
                    </div>
                </div>
                <div className = "chartAndTitle">
                    <VictoryChart 
                    theme = {VictoryTheme.material}
                    domainPadding = {50}
                    width = {350}
                    height = {250}
                    >
                    <VictoryLabel text = {titleOne} x= {175} y = {30} textAnchor = "middle" style ={{fontSize : 10}} />
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

                            axisLabelComponent= {<VictoryLabel dy = {5}/>}
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
                            labels={({ datum }) => `$${datum.y}`}

                        // dataComponent = {<TeamPoint/>}
                        />
                    </VictoryChart>
                </div>
                <div className = 'chartAndTitle'>
                    <VictoryChart 
                    theme = {VictoryTheme.material}
                    domainPadding = {50}
                    width = {350}
                    height = {250}
                    >
                        <VictoryLabel text = {titleTwo} x= {175} y = {30} textAnchor = "middle" style ={{fontSize : 10}} />
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

                            axisLabelComponent= {<VictoryLabel dy = {5}/>}
                            label ="Teams"  
                        />
                        <VictoryAxis
                            dependentAxis
                            axisLabelComponent= {<VictoryLabel dy = {-30}/>}
                            label = "Wins"   
                        />
                    
                        <VictoryBar
                            style={{
                                data:{
                                    fill:({datum})=>datum.better === true ? "#c43a31" : "#1C77C3" 
                                }
                            }}
                            data = {displayDataWins.map(el=>{
                                return(
                                    {
                                        x: el.team,
                                        y: el.wins,
                                        image: el.imageUrl,
                                        better: el.better
                                    }
                                )
                            })}
                            labels={({ datum }) => datum.y}

                        // dataComponent = {<TeamPoint/>}
                        />
                    </VictoryChart>
                </div>
                <div className = "chartAndTitle">
                    <VictoryChart
                        domainPadding = {20}
                        width = {350}
                        height = {250}
                    >
                        <VictoryLabel text = {titleThree} x= {175} y = {30} textAnchor = "middle" style ={{fontSize : 10}} />
                    <VictoryAxis
                            tickValues = {[50,75,100,125,150,175,200,225,250]}
                            style = {{
                                tickLabels: {
                                    width: 10,
                                    padding: 5,
                                    margin:5
                                }
                            }}

                            axisLabelComponent= {<VictoryLabel dy = {-5}/>}
                            label ="Payroll (Millions USD)"  
                        />
                        <VictoryAxis
                        dependentAxis
                            style = {{
                                tickLabels: {
                                    width: 30,
                                    padding: 5,
                                    margin:5
                                }
                            }}

                            axisLabelComponent= {<VictoryLabel dy = {-5}/>}
                            label ="Wins"  
                        />
                        <VictoryScatter
                            data = {relevantData.map(el=>{
                                return(
                                    {
                                        x: el.payroll,
                                        y: el.wins,
                                        image: el.imageUrl,
                                        team: el.team,
                                        year: el.year
                                    }
                                )
                            })}
                            style = {{
                                data: {
                                    fill:({datum})=>datum.team === this.state.teamOne ? "#c43a31" : "#1C77C3" 
                            }
                            }}
                            labels = {({datum})=>`payroll: $${datum.x},\n wins: ${datum.y}, \n team: ${datum.team}, \n year: ${datum.year}`}
                            labelComponent={<VictoryTooltip dy={0} centerOffset={{ x: 25 }} />}
                        // dataComponent = {<TeamPoint/>}
                        ></VictoryScatter>
                    </VictoryChart>
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