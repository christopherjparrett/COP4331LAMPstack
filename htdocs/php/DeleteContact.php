<?php

    $inData = getRequestInfo();

    $id = $inData["id"];

    $conn = new mysqli("localhost", "Group16", "CM2025Lamp!", "contact_manager");

    if($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        $stmt = $conn->prepare("SELECT ID FROM contacts WHERE ID=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if($row = $result->fetch_assoc())
        { 
            $stmt = $conn->prepare("DELETE FROM contacts WHERE ID=?");
            $stmt->bind_param("i", $id); //should this be userID?
            $stmt->execute();
            returnWithConfirm();
        }
        else
        {
            returnWithError("No contact found to delete");
        }
        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

    function returnWithError( $err )
	{
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

    function returnWithConfirm()
	{
		$retValue = '{"id":"","error":""}';
		sendResultInfoAsJson( $retValue );
	}

    function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}  

?>