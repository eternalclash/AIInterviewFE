const handleClick = async (type) => {
    let dataResponse;
    switch (type) {
      case SIDE_TYPE.LIST:
        dataResponse = await getInterviews();
        break;
      case SIDE_TYPE.PLAY:
        dataResponse = await getSimulation();
        break;
      case SIDE_TYPE.PRESET:
        dataResponse = await getPresets();
        break;
    }
    console.log(type);
    console.log(dataResponse);
    if (dataResponse?.data?.result) {
      setSidebar({ clicked: type, list: dataResponse.data.result });
    } else {
      console.log("No data received or error in API response");
      setSidebar((prevState) => ({ ...prevState, clicked: type, list: [] }));
    }
  };