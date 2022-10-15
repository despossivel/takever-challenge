
const response = (res, data, payloadError) => {



	if(!Boolean(data?.docs?.length)) return res.status(404).send(payloadError)
	// if(!Boolean(data.n)) return res.status(404).send(payloadError)
  
	return res.status(200).send(data);
}

module.exports = {
	response
}
