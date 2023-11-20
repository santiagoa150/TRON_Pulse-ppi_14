import SideBarComponent from "../../components/sidebar/SideBarComponent";
import React, {useEffect, useState} from "react";
import CollaboratorsComponent from "../../components/collaborators/CollaboratorsComponent";
import {
    Backdrop,
    CircularProgress,
    createSvgIcon,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {CategoryTransactions} from "../../types/CategoryTransaction";
import './CategoriesPage.css'
import {GenericUtils} from "../../utils/GenericUtils";
import {BackendConstants} from "../../constants/BackendConstants";
import {AxiosUtils} from "../../utils/AxiosUtils";
import {GetAllCategoriesRes} from "../../types/responses/GetAllCategoriesRes";

export function CategoriesPage() {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [transactions, setTransactions] = useState<CategoryTransactions>([]);
    const PlusIcon = createSvgIcon(
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>,
        'Plus',
    );
    const copyOnClipboard = async (e: any) => {
        await navigator.clipboard.writeText(e.target.innerText);
    }

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const login = GenericUtils.resolveLogin()
                const params = {token: login.access_token};
                const apiUrl: string = BackendConstants.GET_ALL_CATEGORIES;
                const response = await AxiosUtils.get<GetAllCategoriesRes>(apiUrl, undefined, params);
                const data = response.data;
                if (!data) {
                    setError(`Error al obtener los contratos.`);
                    setLoading(false);
                    return;
                }

                setTransactions(data.categories);
                setError('');
                setLoading(false);
            } catch (error) {
                setError(`Error al obtener los contratos.`);
                setLoading(false);
            }
        }
        getCategories();
    }, [])

    return (
        <div id={"categories-page-father"}>
            <SideBarComponent/>
            <div className="container"> {/* Aplica la clase de contenedor desde el archivo CSS */}
                <Typography style={{marginLeft: '10px'}} variant="h5" gutterBottom>
                    Transacciones categorizadas:
                </Typography>
                <div>
                    {error && <Typography variant="h6" color="error">{error}</Typography>}
                    {transactions.length > 0 && (
                        <TableContainer id={"trx-transactions-page-table"} component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        {['TxID', 'Valor', 'USD', 'Fecha', 'Desde', 'Hacia', 'Categoria'].map(cn => {
                                            return (<TableCell key={cn}>{cn}</TableCell>);
                                        })}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((row) => (
                                        <TableRow key={row[0]} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                                            <TableCell style={{maxWidth: 150, overflow: 'hidden', cursor: 'copy'}}
                                                       align="left" onClick={copyOnClipboard}>{row[0]}</TableCell>
                                            <TableCell align="left">{`${row[1]} TRX`}</TableCell>
                                            <TableCell
                                                align="left">{`${row[7].toFixed(4)} $`}</TableCell>
                                            <TableCell align="left">{new Date(row[6]).toLocaleDateString()}</TableCell>
                                            <TableCell style={{cursor: 'copy', maxWidth: 180, overflow: 'hidden'}}
                                                       align="left"
                                                       onClick={copyOnClipboard}>{row[4]}</TableCell>
                                            <TableCell style={{cursor: 'copy', maxWidth: 180, overflow: 'hidden'}}
                                                       align="left"
                                                       onClick={copyOnClipboard}>{row[5]}</TableCell>
                                            <TableCell align="left">{row[2]}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>
            <CollaboratorsComponent/>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    )
}