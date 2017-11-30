import {
    Doughnut,
    mixins
} from 'vue-chartjs'
const { reactiveProp } = mixins
export default Doughnut.extend({
    mixins: [reactiveProp],
    props: {
        dataDoucollection: {
            type: Object,
            default: function() {
                return {};
            }

        }
    },
    // data() {
    //     return {
    //         datacollection: {
    //             labels: ['今天', '明天', "后天"],
    //             datasets: [{
    //                 label: '房价',
    //                 backgroundColor: '#f87979',
    //                 data: [40, 20, 60]
    //             }]
    //         }
    //     }
    // },
    // props
    mounted() {
        this.renderChart(this.dataDoucollection, { responsive: true, maintainAspectRatio: false })
    }
})
