import React, {Component} from 'react'
import axios from 'axios'
import { VictoryBar,VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine} from 'victory'


class HomePage extends Component {
    constructor(){
        super()
        this.state = {
            teamData: [],
            uniqueComps: [],
            winPercent: [0]
        }
this.countTheComps = this.countTheComps.bind(this)
this.getTheDubs = this.getTheDubs.bind(this)
    }
    async getThedata() {
        const res =  await axios.get('/api/payroll')
        const data = res.data
        this.setState({teamData: data})
        // this.countTheComps()
        // this.getTheDubs()
    }
    countTheComps(){
        let newComps = []
        for(let i = 0; i <this.state.matchData.length; i++){
            if(!newComps.includes(this.state.matchData[i].enemycomposition)){
                newComps.push(this.state.matchData[i].enemycomposition)
            }
        }
         // this.setState({uniqueComps:newComps})
         let compFrequency = new Array(newComps.length).fill(0)
         for(let j = 0; j < newComps.length; j++){
             this.state.matchData.forEach(el=>{
                 if(el.enemycomposition === newComps[j]){
                  compFrequency[j]++
                 }
             })
          } 
          const compFreq = compFrequency.slice(0)
          const newCompositions = newComps.map(el=>{
              const splitUp = el.split(',')
              const rejoin = splitUp.join(' \n')
              const specSplit = rejoin.split('-')
              const specJoin = specSplit.join(' \n')
              return specJoin
          })
          let compTracker = []
          while(compTracker.length<10){
              const max = compFreq.reduce(function(a,b){
                  return Math.max(a,b)
              })
              const desiredIndex = compFreq.indexOf(max)
              compTracker.push(desiredIndex)
              compFreq.splice(desiredIndex,1,0)
          }
          console.log(compTracker)
          let compState = new Array(10).fill({})
          for(let k = 0; k <compTracker.length; k++){
             compState[k] = {
                 composition: newCompositions[compTracker[k]],
                 matchups: compFrequency[compTracker[k]]
             }
          }
         this.setState({uniqueComps:compState})

    }
    getTheDubs(){
        const clubW = this.state.matchData.filter(el=> el.victory=== "TRUE")
        const winRate = clubW.length/this.state.matchData.length
        this.setState({winPercent:[winRate]})
        console.log(this.state.winPercent)
    }

    getTheMoney(){

    }
    componentDidMount(){
    this.getThedata()

    }

    render(){
        const sumArray = Array(15).fill(0)
        for(let j = 0; j <sumArray.length; j++){
            sumArray[j] = {
                sum: 0,
                year: j + 2001
            }
        }
        for(let i = 2001; i <=2015; i++){
            const dataPoints = this.state.teamData.filter(el=> el.year === i)
            console.log(dataPoints)
            dataPoints.forEach(el => sumArray[i-2001].sum += el.payroll)
            console.log(sumArray)
        }
        console.log(sumArray)
        return(
            <div>
            <VictoryChart 
            theme = {VictoryTheme.material}
            >
            
                <VictoryBar
                    data = {sumArray.map(el=>{
                        return(
                            {
                                x: el.year,
                                y: el.sum
                            }
                        )
                    })}
                ></VictoryBar>
            {/* <VictoryLabel text =  "Most Frequently played opposing compositions" x = {40} y = {30} />
                <VictoryBar
                    data = {this.state.uniqueComps.map(el=>{
                        return(
                            {
                                x:el.composition,
                                y:el.matchups
                            }
                        )
                    })}

                />
                <VictoryAxis
                    style = {{
                        tickLabels: {
                            width: 30,
                            fontSize: 3,
                            padding: 5,
                            margin:5
                        },
                    }}
                    axisLabelComponent= {<VictoryLabel dy = {15}/>}
                    label ="Opposing Team Composition"   
                />
                <VictoryAxis
                    dependentAxis
                    axisLabelComponent= {<VictoryLabel dy = {-15}/>}
                    label = "number of times played"
                /> */}


            </VictoryChart>

            <VictoryChart 
            theme = {VictoryTheme.material}
            >
                <VictoryAxis
                    dependentAxis
                    label = "Win rate"
                    domain = {{x:[0,2], y:[0,100]}}
                    axisLabelComponent= {<VictoryLabel dy = {-25}/>}
                    // padding={{ top: 20, bottom: 60 }}
                />
                <VictoryLabel text =  "Overall win percentage" x = {120} y = {30} />
                <VictoryBar
                    data = {[{x: 1, y:this.state.winPercent * 100}]}
                />
                <VictoryLine
                   data = {[
                       {x:0, y:50},
                       {x:1, y:50},
                       {x:2, y: 50}
                   ]} 
                    style = {{data: {stroke: "red",strokeWidth:1}}}
                    label = "50%"
                    // y = {0.5}
                />

            </VictoryChart>
            </div>
        )
    }
}

export default HomePage