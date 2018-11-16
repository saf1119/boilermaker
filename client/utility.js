export const analyzeTemperature = data => {
	let tempLow = 1000
	let tempHigh = 0
	let avgTemp = 0
	let precip = ''
	data.forEach(day => {
		avgTemp += (day.temperatureHigh + day.temperatureLow) / 2
		if (day.temperatureLow < tempLow) tempLow = day.temperatureLow
		if (day.temperatureHigh > tempHigh) tempHigh = day.temperatureHigh
		if (day.precipProbability > 0.4) precip = day.precipType
	})
	avgTemp = avgTemp / 8
	return {
		lowTemp: tempLow,
		highTemp: tempHigh,
		precip: precip,
		avgTemp: avgTemp
	}
}

export const calculateList = (
	{avgTemp, lowTemp, highTemp, precip},
	numDays
) => {
	let listItems = []
	numDays = parseInt(numDays)
	let numPants = (numDays > 8) ? 4 : Math.floor(numDays/2)
	if (avgTemp > 70) {
		listItems = [
			{
				name: 'pair(s) of shorts',
				quantity: numPants
			},
			{
				name: 'short-sleeved shirts',
				quantity: numDays + 1
			},
			{
				name: 'pair of sandals',
				quantity: 1
			},
			{
				name: 'pairs of socks',
				quantity: numDays + 1
			},
			{
				name: 'pair of sneakers',
				quantity: 1
			},
			{
				name: 'set of pajamas',
				quantity: 1
			},
			{
				name: 'swimsuit',
				quantity: 1
			},
			{
				name: 'pairs of underwear',
				quantity: numDays + 1
			}
		]
	} else if (avgTemp >= 60 && avgTemp <= 70) {
		listItems = [
			{
				name: 'pair(s) of pants',
				quantity: numPants
			},
			{
				name: 'pair of shorts',
				quantity: 1
			},
			{
				name: 'short-sleeved shirts',
				quantity: numDays + 1
			},
			{
				name: 'sweater',
				quantity: 1
			},
			{
				name: 'light jacket',
				quantity: 1
			},
			{
				name: 'pairs of socks',
				quantity: numDays + 1
			},
			{
				name: 'pair of sneakers',
				quantity: 1
			},
			{
				name: 'set of pajamas',
				quantity: 1
			},
			{
				name: 'swimsuit',
				quantity: 1
			},
			{
				name: 'pairs ofunderwear',
				quantity: numDays + 1
			}
		]
	} else if (avgTemp >= 50 && avgTemp < 60) {
		listItems = [
			{
				name: 'pair(s) pants',
				quantity: numPants
			},
			{
				name: 'short-sleeved shirts',
				quantity: Math.floor(numDays / 2)
			},
			{
				name: 'long-sleeved shirts',
				quantity: Math.ceil(numDays / 2)
			},
			{
				name: 'sweater',
				quantity: 1
			},
			{
				name: 'light jacket',
				quantity: 1
			},
			{
				name: 'pairs of socks',
				quantity: numDays + 1
			},
			{
				name: 'pair of sneakers',
				quantity: 1
			},
			{
				name: 'pair of boots',
				quantity: 1
			},
			{
				name: 'set of pajamas',
				quantity: 1
			},
			{
				name: 'pairs of underwear',
				quantity: numDays + 1
			}
		]
	} else if (avgTemp >= 40 && avgTemp < 50) {
		listItems = [
			{
				name: 'pair of pants',
				quantity: numPants
			},
			{
				name: 'short-sleeved shirts',
				quantity: Math.floor(numDays / 2) + 1
			},
			{
				name: 'long-sleeved shirts',
				quantity: Math.ceil(numDays / 2) + 1
			},
			{
				name: 'sweater',
				quantity: 1
			},
			{
				name: 'jacket',
				quantity: 1
			},
			{
				name: 'pair of socks',
				quantity: numDays + 1
			},
			{
				name: 'pair of sneakers',
				quantity: 1
			},
			{
				name: 'pair of boots',
				quantity: 1
			},
			{
				name: 'set of pajamas',
				quantity: 1
			},
			{
				name: 'pairs of underwear',
				quantity: numDays + 1
			}
		]
	} else {
		listItems = [
			{
				name: 'pairs of pants',
				quantity: numPants
			},
			{
				name: 'long-sleeved shirts',
				quantity: numDays + 1
			},
			{
				name: 'sweaters',
				quantity: 2
			},
			{
				name: 'coat',
				quantity: 1
			},
			{
				name: 'pairs of socks',
				quantity: numDays + 1
			},
			{
				name: 'sneakers',
				quantity: 1
			},
			{
				name: 'boots',
				quantity: 1
			},
			{
				name: 'pajamas',
				quantity: 1
			},
			{
				name: 'pairs of underwear',
				quantity: numDays + 1
			}
		]
	}
	if (precip) {
		listItems.push({name: `${precip} jacket`, quantity: 1})
	}
	return listItems
}
