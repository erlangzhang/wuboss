import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default Bar.extend({
    mixins: [reactiveProp],
    props: {
        datacollection: {
            type: Object,
            default: function() {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    mounted() {
        this.renderChart(this.datacollection, { responsive: true, maintainAspectRatio: false })
    }
})
