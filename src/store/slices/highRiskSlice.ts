import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchHighRiskEmployees } from "../actions/highRiskActions";

export interface Employee {
	employee_id: string;
	name: string;
	avatar: string;
	focus_groups: string;
	escalated: boolean;
	meet_scheduled: boolean;
}

interface HighRiskEmployeeState {
	highRiskEmployees: Employee[];
	loading: boolean
}

const initialState: HighRiskEmployeeState = {
	highRiskEmployees: [],
	loading: false
};

const highRiskEmployeeSlice = createSlice({
	name: "persona",
	initialState,
	reducers: {
		setEmployees: (state, action: PayloadAction<Employee[]>) => {
			state.highRiskEmployees = action.payload;
		},
		setEscalation: (state, action: PayloadAction<{ employee_id: string, escalation: boolean }>) => {
			const { employee_id, escalation } = action.payload;
			const employee = state.highRiskEmployees.find(emp => emp.employee_id === employee_id);
			if (employee) {
				employee.escalated = escalation;
			}
		},
		setMeetScheduled: (state, action: PayloadAction<{ employee_id: string, meet_scheduled: boolean }>) => {
			const { employee_id, meet_scheduled } = action.payload;
			const employee = state.highRiskEmployees.find(emp => emp.employee_id === employee_id);
			if (employee) {
				employee.meet_scheduled = meet_scheduled;
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchHighRiskEmployees.pending, (state) => {
			state.loading = true
		});
		builder.addCase(fetchHighRiskEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
			state.loading = false
			state.highRiskEmployees = action.payload;
		});
		builder.addCase(fetchHighRiskEmployees.rejected, (state, action) => {
			state.loading = false
			console.error("Failed to fetch high-risk employees:", action.error.message);
		});
	}
});

export const { setEmployees, setEscalation, setMeetScheduled } = highRiskEmployeeSlice.actions;
export default highRiskEmployeeSlice.reducer;
