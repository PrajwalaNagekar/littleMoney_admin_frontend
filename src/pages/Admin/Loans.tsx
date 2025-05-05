import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllDetails } from '../../api/index';
import DataTableComponent from '../../components/common/DataTableComponent';

// ✅ Mapping for business registration types
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

// ✅ Define TypeScript interface
interface LoanRow {
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
    pincode?: string;
    loginCount?: number;
    lenderName?: string;
    createdAt?: string;
    updatedAt?: string;
}

const Loans = () => {
    const [loanData, setLoanData] = useState<LoanRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ✅ Define table columns
    const columns = [
        
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
        { accessor: 'pincode', title: 'Pincode' },
        { accessor: 'loginCount', title: 'Login Count' },
        { accessor: 'lenderName', title: 'Lender Name' },
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
            render: (row: LoanRow) => (
                <Link
                    to={`/loans/offers`}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                >
                    View Offers
                </Link>
            ),
        }
    ];

    // ✅ Fetch and transform data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllDetails();
                const rawData = response?.data;

                if (!Array.isArray(rawData)) throw new Error("Invalid response");

                const normalizedData: LoanRow[] = [];

                rawData.forEach(item => {
                    const leadId = item.leadId;
                    const loginCount = item.loginCountRef?.count ?? 0;
                    const lenderName = item.appliedCustomersRef?.lenderName ?? '';
                    const createdAt = item.createdAt;
                    const updatedAt = item.updatedAt;

                    if (item.personalLoanRef) {
                        normalizedData.push({
                            leadId,
                            loanType: 'Personal Loan',
                            firstName: item.personalLoanRef.firstName,
                            lastName: item.personalLoanRef.lastName,
                            dob: item.personalLoanRef.dob,
                            email: item.personalLoanRef.email,
                            mobileNumber: item.personalLoanRef.mobileNumber,
                            monthlyIncome: item.personalLoanRef.monthlyIncome,
                            employerName: item.personalLoanRef.employerName,
                            loginCount,
                            lenderName,
                            createdAt,
                            updatedAt,
                        });
                    }

                    if (item.businessLoanRef) {
                        normalizedData.push({
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
                            pincode: item.businessLoanRef.pincode,
                            loginCount,
                            lenderName,
                            createdAt,
                            updatedAt,
                        });
                    }
                });

                setLoanData(normalizedData);
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
                    <DataTableComponent
                        data={loanData}
                        columns={columns}
                    />
                )}
            </div>
        </div>
    );
};

export default Loans;