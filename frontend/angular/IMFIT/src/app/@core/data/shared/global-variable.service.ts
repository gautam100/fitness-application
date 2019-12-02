import { Component, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class GlobalVariableService {

    constructor() { }

    errors = {
        dbTableColumnError: 'DataBase Table Structure Got Changed...Will Update Soon. ',
        dbConnectionTerminated: 'DataBaseConnection Terminated Unexpectedly'
    };

    selectedDrug = [];
    selectedCompany = [];
    phase: any;
    // selectedTa = { ta_id: 1 };
    selectedTa = this.configureTAID();

    selectedCP = [];
    selectedDS;
    selectedDIID;
    selectedUN;
    selectedModel = this.configureModelID();
    phases = [];
    temp: any = [];

    public initFromDate = { year: 2017, month: 10, day: 1 };
    public initToDate = { year: 2018, month: 12, day: 31 };

    fromDate = this.initFromDate;
    toDate = this.initToDate;
    monthNameViaNumber = [undefined, 'Qtr 1 January', 'Qtr 1 February', 'Qtr 1 March', 'Qtr 2 April', 'Qtr 2 May', 'Qtr 2 June', 'Qtr 3 July', 'Qtr 3 August', 'Qtr 3 September', 'Qtr 4 October', 'Qtr 4 November', 'Qtr 4 December'];
    QtrNameViaNumber = [undefined, 'Qtr 1 March', 'Qtr 2 June', 'Qtr 3 September', 'Qtr 4 December'];
    selectedGene = [];
    selectedIndication = [];
    filterParams = {};
    filtercollapsed = false;
    selectedTimelines = [2018, 2017];
    // selectedAllTimelines: boolean;
    updatedselectedTimelines = [];
    selectedSegment;
    selectedGWD;
    chartFilterParams = {};
    graphPointSelectedColor: string = '#FF1493';
    //############### Chart Filter Params Initiallization ############# //
    chartFilterDisease: number;
    chartFilterTechName: Array<string> = [];
    chartFilterYear: number;
    chartFilterCompany: number;
    chartFilterPhase;
    chartFilterEventId: number;
    chartFilterDrugId: number;
    chartFilterIntesityRange: string = undefined;
    dataSourceLoad: Array<any> = [];
    defaultTAID: any;
    defaultModelID: any;
    timebreakup: number;
    chartFilterQuarter: number;
    chartFilterMonth: number;
    chartFilterWeek: number;
    chartFilterDate: any;

    result: any = [];
    loading: boolean = false;
    tas: any = [];
    newData: any = [];
    toggleSideFilter = new Subject<boolean>();
    filterstatus: boolean = true;
    selectedDefaultTasWithName: any = [];

    configureTAID() {
        this.defaultTAID = parseInt(localStorage.getItem('selectedDefaultTA'));
        return [this.defaultTAID];
    }

    configureModelID() {
        this.defaultModelID = localStorage.getItem('selectedDefaultModel');
        return { model_id: this.defaultModelID };
    }

    setTimeLines(args) {
        this.selectedTimelines = args;
    }
    getTimeLines() {
        return this.selectedTimelines;
    }

    // setSelectedAllTimeLines(args) {
    //     this.selectedAllTimelines = args;
    // }
    // getSelectedAllTimeLines() {
    //     return this.selectedAllTimelines;
    // }

    setEventType(eventType: string) {
        sessionStorage.setItem('selectedEventType', eventType);
    }
    getEventType() {
        return sessionStorage.getItem('selectedEventType');
    }
    setSelectedTa(ta: any) { // array of Selected TAs
        this.selectedTa = ta;

    }
    setSelectedDefaultTA(ta: any) { //First Choice i.e Single TA
        this.selectedDefaultTasWithName[0] = ta;
        localStorage.setItem('selectedDefaultTA', ta.ta_id);
    }
    getSelectedDefaultTA() {
        return this.selectedDefaultTasWithName;
    }
    getSelectedTa() {
        return this.selectedTa;
    }
    setFromDate(from_date) {
        this.fromDate = from_date;
    }
    getFromDate() {
        return this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day;
    }
    setToDate(to_date) {
        this.toDate = to_date;
    }
    getToDate() {
        return this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day;
    }
    setSelectedGene(gene) {
        this.selectedGene = gene;
    }
    getSelectedGene() {
        return this.selectedGene;
    }
    setSelectedIndication(indication) {
        console.log(indication);
        this.selectedIndication = indication;
    }
    getSelectedIndication() {
        return this.selectedIndication;
    }
    setSelectedCP(cp) {
        this.selectedCP = cp;
    }
    getSelectedCP() {
        return this.selectedCP;
    }
    setSelectedUN(un: any) {
        this.selectedUN = un;
    }
    getSelectedUN() {
        return this.selectedUN;
    }
    setSelectedModel(model) {
        this.selectedModel = model;
    }
    getSelectedModel() {
        return this.selectedModel;
    }
    setSelectedGWD(gwd: any) {
        this.selectedGWD = gwd;
    }
    getSelectedGWD() {
        return this.selectedGWD;
    }
    getFilterParams(mergeParam = {}) {  // Use of parameter is for if someone wants to pass filter params custom,
        this.filterParams = {
            event_type_id: this.getEventType(),
            from_date: this.getFromDate(),
            to_date: this.getToDate(),
            ta_id: this.getSelectedTa().length > 0 ? this.getSelectedTa() : undefined,
            gene_ids: this.getSelectedGene().length > 0 ? this.getSelectedGene() : undefined,
            di_ids: this.getSelectedIndication().length > 0 ? this.getSelectedIndication() : undefined,
            phase_id: this.getSelectedCP().length > 0 ? this.getSelectedCP() : undefined,
            unmetneed_id: this.getSelectedUN() ? this.getSelectedUN().unmetneed_id : undefined,
            model_id: this.getSelectedModel().model_id ? this.getSelectedModel().model_id : undefined,
            c_ids: this.getSelectedCompanies().length > 0 ? this.getSelectedCompanies() : undefined,

            drug_ids: this.getSelectedDrugs().length > 0 ? this.getSelectedDrugs() : undefined,
            dss_id: this.getSelectedDS() ? this.getSelectedDS().dss_id : undefined,
            segment_id: this.getSelectedSegment() != undefined ? this.getSelectedSegment() : undefined,
            gds_id: this.getSelectedGWD() != undefined ? this.getSelectedGWD() : undefined,
            timeline: this.getTimeLines().length > 0 ? this.getTimeLines() : undefined,
            table_di: this.getSelectedDIID() != undefined ? this.getSelectedDIID() : undefined,
        };
        return Object.assign(mergeParam, this.filterParams);
    }
    resetfilters() {
        // this.setFromDate({ year: 2016, month: 10, day: 1 });
        //this.setToDate({ year: 2017, month: 3, day: 31 });
        this.setFromDate(this.initFromDate);
        this.setToDate(this.initToDate);
        //this.setSelectedTa([]);
        this.setSelectedGene([]);
        // this.setSelectedIndication([]);
        this.setSelectedCP([]);
        this.setSelectedUN({ un: undefined });
        this.setSelectedCompanies([]);
        this.setSelectedDrugs([]);
        this.setSelectedSegment(undefined);
        this.setSelectedGWD(undefined);
    }

    getChartFilterParams(param = {}) {
        this.chartFilterParams = {
            chart_di_id: this.getChartFilterDisease() ? this.getChartFilterDisease() : undefined,
            chart_timeline: this.getChartFilterYear() ? this.getChartFilterYear() : undefined,
            chart_techName: this.getChartFilterTechName().length > 0 ? this.getChartFilterTechName() : undefined,
            chart_phase_id: this.getChartFilterPhase() ? this.getChartFilterPhase() : undefined,
            chart_event_id: this.getChartFilterEventId() ? this.getChartFilterEventId() : undefined,
            chart_drug_id: this.getChartFilterDrugId() ? this.getChartFilterDrugId() : undefined,
            chart_companyID: this.getChartFilterCompany() ? this.getChartFilterCompany() : undefined,
            chart_intensity_range: this.getChartFilterIntensityRange() ? this.getChartFilterIntensityRange() : undefined,
            chart_timeBreakUp: this.getChartTimeBreakUp() ? this.getChartTimeBreakUp() : undefined,
            chart_quarter: this.getChartFilterQuarter() ? this.getChartFilterQuarter() : undefined,
            chart_month: this.getChartFilterMonth() ? this.getChartFilterMonth() : undefined,
            chart_week: this.getChartFilterWeek() ? this.getChartFilterWeek() : undefined,
            chart_date: this.getChartFilterDate() ? this.getChartFilterDate() : undefined,

        }
        return Object.assign(param, this.chartFilterParams);
    }
    resetChartFilter() {
        this.setChartFilterDisease(undefined);
        this.setChartFilterYear(undefined);
        this.setChartFilterTechName([]);
        this.setChartFilterPhase(undefined);
        this.setChartFilterEventId(undefined);
        this.setChartFilterDrugId(undefined);
        this.setChartFilterQuarter(undefined);
        this.setChartFilterMonth(undefined);
        this.setChartFilterWeek(undefined);
        this.setChartFilterDate(undefined);
    }

    setPhases(phases) {
        this.phases = phases;
    }
    getPhases(value) {
        for (var i = 0; i < this.phases.length; i++) {
            if (this.phases[i].phase_id == value) {
                return this.phases[i];
            }
        }
        return null;
    }

    Filtertoggle() {
        if (this.filtercollapsed) {
            this.filtercollapsed = false;
        } else {
            this.filtercollapsed = true;
        }

    }

    setSelectedCompanies(company) {
        this.selectedCompany = company;
    }
    getSelectedCompanies() {
        return this.selectedCompany;
    }
    setSelectedDrugs(drug) {
        this.selectedDrug = drug;
    }
    getSelectedDrugs() {
        return this.selectedDrug;
    }

    setSelectedDS(ds: any) {
        this.selectedDS = ds;
    }

    getSelectedDS() {
        return this.selectedDS;
    }

    setSelectedDIID(table_di: any) {
        this.selectedDIID = table_di;
    }
    getSelectedDIID() {
        return this.selectedDIID;
    }

    setSelectedSegment(segment) {
        this.selectedSegment = segment;
    }
    getSelectedSegment() {
        return this.selectedSegment;
    }

    //############# Start Chart Filter Params Handling ############//
    setChartFilterDisease(disease) {
        this.chartFilterDisease = disease;
    }
    getChartFilterDisease() {
        return this.chartFilterDisease;
    }
    setChartFilterYear(year) {
        this.chartFilterYear = year;
    }
    getChartFilterYear() {
        return this.chartFilterYear;
    }
    setChartFilterTechName(tech_name) {
        this.chartFilterTechName = tech_name;
    }
    getChartFilterTechName() {
        return this.chartFilterTechName;
    }

    setChartFilterCompany(company) {
        this.chartFilterCompany = company;
    }
    getChartFilterCompany() {
        return this.chartFilterCompany;
    }

    setChartFilterPhase(phase) {
        this.chartFilterPhase = phase;
    }
    getChartFilterPhase() {
        return this.chartFilterPhase;
    }
    setChartFilterEventId(event_id) {
        this.chartFilterEventId = event_id;
    }
    getChartFilterEventId() {
        return this.chartFilterEventId;
    }
    setChartFilterDrugId(drug_id) {
        this.chartFilterDrugId = drug_id;
    }
    getChartFilterDrugId() {
        return this.chartFilterDrugId;
    }
    setChartFilterIntensityRange(intesityRange: string) {
        this.chartFilterIntesityRange = intesityRange.trim();
    }
    getChartFilterIntensityRange() {
        if (undefined != this.chartFilterIntesityRange) {
            var range = this.chartFilterIntesityRange.split('-');
            return range[0] + ' and ' + range[1];
        } else {
            return undefined;
        }
    }
    setChartTimeBreakUp(timeBreakupId) {
        this.timebreakup = timeBreakupId;
    }
    getChartTimeBreakUp() {
        return this.timebreakup;
    }
    setChartFilterQuarter(quarter) {
        this.chartFilterQuarter = quarter;
    }
    getChartFilterQuarter() {
        return this.chartFilterQuarter;
    }
    setChartFilterMonth(month) {
        this.chartFilterMonth = month;
    }
    getChartFilterMonth() {
        return this.chartFilterMonth;
    }
    setChartFilterWeek(week) {
        this.chartFilterWeek = week;
    }
    getChartFilterWeek() {
        return this.chartFilterWeek;
    }
    setChartFilterDate(date) {
        this.chartFilterDate = date;
    }
    getChartFilterDate() {
        return this.chartFilterDate;
    }
    //############# End Chart Filter Params Handling ##############//

    setDataSourceLoad(source) {
        this.dataSourceLoad = source;
    }
    getDataSourceLoad() {
        return this.dataSourceLoad;
    }

    getSideMenuFilterStatus() {
        return this.filterstatus;
    }
    setSideMenuFilterStatus(status: boolean) {
        this.filterstatus = status;
        this.toggleSideFilter.next(status); //it is publishing this value to all the subscribers that have already subscribed to this message
    }


}