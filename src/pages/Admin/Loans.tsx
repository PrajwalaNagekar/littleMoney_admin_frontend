import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDetails, getSummary } from '../../api/index';
import DataTableComponent from '../../components/common/DataTableComponent';

const businessRegistrationTypeMap: Record<number, string> = {
    1: "GST",
    2: "Shop & Establishment",
    3: "Municipal Corporation / Mahanagar",
    4: "Palika Gramapanchayat",
    5: "Udyog Aadhar",
    6: "Drugs License / Food & Drugs Control",
    7: "Other",
    8: "No Business Proof"
};

interface LoanRow {
    id: string;
    leadId: string;
    loanType: 'Personal Loan' | 'Business Loan';
    firstName?: string;
    lastName?: string;
    dob?: string;
    email?: string;
    mobileNumber?: string;
    monthlyIncome?: number;
    employerName?: string;
    businessRegistrationType?: number;
    pan?: string;
    referal?: string,
    pincode?: string;
    loginCount?: number;
    lenderName?: string;
    createdAt?: string;
    updatedAt?: string;
    offersTotal?: number;
    maxLoanAmount?: string;
    minMPR?: number;
    maxMPR?: number;
}

const Loans = () => {
    const [loanData, setLoanData] = useState<LoanRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const columns = [
        { accessor: 'serialNo', title: 'S.No.' },
        { accessor: 'loanType', title: 'Type of Loan' },
        { accessor: 'leadId', title: 'Lead ID', sortable: true },
        { accessor: 'firstName', title: 'First Name' },
        { accessor: 'lastName', title: 'Last Name' },
        { accessor: 'dob', title: 'DOB' },
        { accessor: 'email', title: 'Email' },
        { accessor: 'mobileNumber', title: 'Phone' },
        { accessor: 'monthlyIncome', title: 'Monthly Income' },
        { accessor: 'employerName', title: 'Employer Name' },
        {
            accessor: 'businessRegistrationType',
            title: 'Business Reg Type',
            render: (row: LoanRow) =>
                row.businessRegistrationType
                    ? businessRegistrationTypeMap[row.businessRegistrationType]
                    : '-'
        },
        { accessor: 'pan', title: 'PAN' },
        { accessor: 'referal', title: 'Referal Code' },
        { accessor: 'pincode', title: 'Pincode' },
        { accessor: 'loginCount', title: 'Login Count' },
        { accessor: 'lenderName', title: 'Lender Name' },
        { accessor: 'offersTotal', title: 'Total Offers' },
        { accessor: 'maxLoanAmount', title: 'Max Loan Amount' },
        { accessor: 'minMPR', title: 'Min MPR' },
        { accessor: 'maxMPR', title: 'Max MPR' },
        {
            accessor: 'createdAt',
            title: 'Created At',
            render: (row: LoanRow) =>
                row.createdAt ? new Date(row.createdAt).toLocaleString() : '-'
        },
        {
            accessor: 'updatedAt',
            title: 'Updated At',
            render: (row: LoanRow) =>
                row.updatedAt ? new Date(row.updatedAt).toLocaleString() : '-'
        },
        {
            accessor: 'actions',
            title: 'Actions',
            render: ({ row, serialNo }: { row: LoanRow, serialNo: number }) => (
                <Link
                    to={`/admin/loans/${serialNo}`}
                    className="btn btn-primary gap-2"

                >
                    View Offers
                </Link>
            ),
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllDetails();
                console.log("🚀 ~ fetchData ~ response:", response)
                const rawData = response?.data;

                if (!Array.isArray(rawData)) throw new Error("Invalid response");

                const normalizedData: LoanRow[] = [];

                for (const item of rawData) {
                    const leadId = item.leadId;
                    const loginCount = item.loginCountRef?.count ?? 0;
                    console.log("🚀 ~ fetchData ~ leadId:", leadId)
                    const lenderName = item.appliedCustomersRef?.lenderName ?? '';
                    const createdAt = item.createdAt;
                    const updatedAt = item.updatedAt;
                    if (leadId) {
                        localStorage.setItem('leadId', leadId); // Store the leadId in localStorage
                    }
                    // Fetch summary
                    let offersTotal, maxLoanAmount, minMPR, maxMPR;
                    try {
                        const summaryResponse = await getSummary(leadId); // Assuming getSummary accepts leadId as param
                        const summary = summaryResponse?.data?.summary;
                        offersTotal = summary?.offersTotal;
                        maxLoanAmount = summary?.maxLoanAmount;
                        minMPR = summary?.minMPR;
                        maxMPR = summary?.maxMPR;
                    } catch (e) {
                        console.warn(`Failed to fetch summary for leadId: ${leadId}`);
                    }

                    if (item.personalLoanRef) {
                        normalizedData.push({
                            id: leadId,
                            leadId,
                            loanType: 'Personal Loan',
                            firstName: item.personalLoanRef.firstName,
                            lastName: item.personalLoanRef.lastName,
                            dob: item.personalLoanRef.dob,
                            email: item.personalLoanRef.email,
                            mobileNumber: item.personalLoanRef.mobileNumber,
                            monthlyIncome: item.personalLoanRef.monthlyIncome,
                            employerName: item.personalLoanRef.employerName,
                            referal: item.personalLoanRef.referal,
                            loginCount,
                            lenderName,
                            createdAt,
                            updatedAt,
                            offersTotal,
                            maxLoanAmount,
                            minMPR,
                            maxMPR
                        });
                    }

                    if (item.businessLoanRef) {
                        normalizedData.push({
                            id: leadId,
                            leadId,
                            loanType: 'Business Loan',
                            firstName: item.businessLoanRef.firstName,
                            lastName: item.businessLoanRef.lastName,
                            dob: item.businessLoanRef.dob,
                            email: item.businessLoanRef.email,
                            mobileNumber: item.businessLoanRef.mobileNumber,
                            monthlyIncome: item.businessLoanRef.monthlyIncome,
                            businessRegistrationType: item.businessLoanRef.businessRegistrationType,
                            pan: item.businessLoanRef.pan,
                            referal: item.businessLoanRef.referal,
                            pincode: item.businessLoanRef.pincode,
                            loginCount,
                            lenderName,
                            createdAt,
                            updatedAt,
                            offersTotal,
                            maxLoanAmount,
                            minMPR,
                            maxMPR
                        });
                    }
                }

                // Add Serial Number to each row
                const dataWithSerialNo = normalizedData.map((row, index) => ({
                    ...row,
                    serialNo: index + 1
                }));

                setLoanData(dataWithSerialNo);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch loan data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/" className="text-primary hover:underline">
                        Dashboard
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Loans</span>
                </li>
            </ul>

            <div className="mt-4">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <DataTableComponent data={loanData} columns={columns} />
                )}
            </div>
        </div>
    );
};

export default Loans;
