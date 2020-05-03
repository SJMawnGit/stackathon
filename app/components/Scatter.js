import React, {Component} from 'react'
import axios from 'axios'
import { VictoryBar,VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryLine, VictoryScatter} from 'victory'


class Scatter extends Component {
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
        // const sumArray = Array(15).fill(0)
        // for(let j = 0; j <sumArray.length; j++){
        //     sumArray[j] = {
        //         sum: 0,
        //         year: j + 2001
        //     }
        // }
        // for(let i = 2001; i <=2015; i++){
        //     const dataPoints = this.state.teamData.filter(el=> el.year === i)
        //     console.log(dataPoints)
        //     dataPoints.forEach(el => sumArray[i-2001].sum += el.payroll)
        //     console.log(sumArray)
        // }
        // console.log(sumArray)
        const relevantData = this.state.teamData.filter(el=>el.year ===2001)
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
                                y: el.wins
                            }
                        )
                    })}
                ></VictoryScatter>
            </VictoryChart>
            </div>
        )
    }
}

export default Scatter