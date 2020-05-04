import React, {Component} from 'react'
import axios from 'axios'
import TeamPoint from './TeamPoint'
import { VictoryBar,VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine, VictoryScatter, VictoryTooltip} from 'victory'


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
        const titleOne = `Wins Vs. Payroll for ${this.state.startYear}-${this.state.endYear}`
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
                </div>
                <div className = "chartAndTitle">
                    <VictoryChart 
                    theme = {VictoryTheme.material}
                    domainPadding = {10}
                    height = {300}
                    width = {400}
                    >
                        <VictoryLabel text = {titleOne} x= {200} y = {30} textAnchor = "middle" style ={{fontSize : 10}} />
                        <VictoryAxis
                            tickValues = {[50,75,100,125,150,175,200,225,250]}
                            style = {{
                                tickLabels: {
                                    width: 10,
                                    padding: 5,
                                    margin:5
                                }
                            }}

                            axisLabelComponent= {<VictoryLabel dy = {20}/>}
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

                            axisLabelComponent= {<VictoryLabel dy = {-15}/>}
                            label ="Wins"  
                        />
                    
                        <VictoryScatter
                            data = {relevantData.map(el=>{
                                return(
                                    {
                                        x: el.payroll,
                                        y: el.wins,
                                        image: el.imageUrl,
                                        team : el.team,
                                        year: el.year
                                    }
                                )
                            })}
                            style = {{
                                data: {
                                    fill: "#1C77C3" 
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
}

export default Scatter