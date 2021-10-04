import { screen, log, Widgets, box } from 'blessed'
import { bar } from 'blessed-contrib'
import { preProcessFile } from 'typescript'
var contrib = require('blessed-contrib')

var screenDashboard = screen({
    smartCSR: true
})

var defaultStyle = {
    style:
    {
        fg: '#00AA00',
        bg: '#000000',
        border: {
            fg: '#006600'
        }
    }
}

// LOG
var logScreen: Widgets.Log = log({
    parent: screenDashboard,
    label: 'Server Log',
    content: '',
    top: '0',
    right: '0',
    width: '50%',
    height: '100%',
    border: {
        type: 'line'
    },
    scrollable: true

})

// SERVER UTILIZATION
var serverUtilization = contrib.bar({
    label: 'Server Utilization (%)',
    top: '0',
    left: '0',
    height: '50%',
    width: '50%',
    barWidth: 10,
    barSpacing: 20,
    xOffset: 15,
    maxHeight: 100,
    border: {
        type: 'line'
    }
})
screenDashboard.append(serverUtilization)

serverUtilization.setData({
    titles: ['Billing (%)', 'Cart (%)'],
    data: [13, 42]
})


// STATUS BILLING
var statusBilling = box({
    parent: screenDashboard,
    label: ' Billing Status',
    content: '',
    top: "50%+1",
    left: '0',
    width: '50%',
    height: '25%',
    border: {
        type: 'line'
    },
    style: {
        bg: '#00AA00'
    }
})


// STATUS CART
var statusCart = box({
    parent: screenDashboard,
    label: ' Cart Status',
    content: '',
    bottom: '0',
    left: '0',
    width: '50%',
    height: '25%',
    border: {
        type: 'line'
    },
    style: {
        bg: '#00AA00'
    }
})


// Trata Saída do APP
screenDashboard.key(['escape', 'q'], () => {
    return process.exit(0)
})

// Renderiza a tela
screenDashboard.render()

setInterval(() => {
    logScreen.log('ALERTA - ' + Math.random())

    serverUtilization.setData({
        titles: ['Billing (%)', 'Cart (%)'],
        data: [
            Math.floor(Math.random() * (99 - 1 + 1)) + 1,
            Math.floor(Math.random() * (99 - 1 + 1)) + 1
        ]
    })

    statusBilling.style.bg = '#FF0000'
}, 2000)