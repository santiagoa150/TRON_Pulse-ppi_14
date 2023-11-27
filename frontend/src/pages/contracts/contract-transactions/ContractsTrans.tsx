import React, {useState} from 'react';
import axios from 'axios';
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import SideBarComponent from '../../../components/sidebar/SideBarComponent';
import './ContractsTrans.css';
import CollaboratorsComponent from "../../../components/collaborators/CollaboratorsComponent";

const ContractsTrans: React.FC = () => {
    const [contractAddress, setContractAddress] = useState('');
    const [transactions, setTransactions] = useState<any[]>([]);

    const handleFetchTransactions = async () => {
        try {
            const response = await axios.get(`/api/v1/tronapi/contract-transactions/${contractAddress}/`, {baseURL: process.env.REACT_APP_BASE_URL});
            setTransactions(response.data.response.data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);

        }
        console.log('response.data')
    };

    return (
        <div className="contracts-page-father">
            <SideBarComponent/>
            <div className="trx-transactions-page-container">
                <h2 className={"title-contracts"}>Transacciones de tokens:</h2>
                <div className={"contract-transactions-header"}>
                    <TextField
                        sx={{width: 350}}
                        id="contractAddress"
                        label="Contract Address"
                        variant="outlined"
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                    />
                    <Button sx={{height: 40}} variant="contained" onClick={handleFetchTransactions}>
                        Traer transacciones
                    </Button>
                </div>
                <div>
                    <TableContainer sx={{borderRadius: 0, boxShadow: 0}} component={Paper} className="table-container">
                        <Table size={"small"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>TX ID</TableCell>
                                    <TableCell>Bloque</TableCell>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Desde</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((transaction, index) => (
                                    <TableRow key={index}>
                                        <TableCell
                                            style={{maxWidth: 200, overflow: "hidden"}}>{transaction.txID}</TableCell>
                                        <TableCell>{transaction.blockNumber}</TableCell>
                                        <TableCell>{new Date(transaction.raw_data.timestamp).toLocaleDateString()}</TableCell>
                                        <TableCell>{transaction.raw_data.contract[0].parameter.value.owner_address}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <CollaboratorsComponent></CollaboratorsComponent>
        </div>
    );
};

export default ContractsTrans;