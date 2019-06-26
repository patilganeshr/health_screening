<%@ Page Title="Case Paper" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Patient.aspx.cs" Inherits="HealthScreeningApp.Masters.Patient" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="cpMaster" runat="server">

    <div class="action-toolbar">

        <a href="#" id="AddNewPatient"><i class="fa fa-plus fa-fw"></i>New</a>
        <a href="#" id="ShowPatientList"><i class="fa fa-list fa-fw"></i>List</a>
        <a href="#" id="ViewPatient"><i class="fa fa-eye fa-fw"></i>View</a>
        <a href="#" id="EditPatient"><i class="fa fa-edit fa-fw"></i>Edit</a>
        <a href="#" id="SavePatient"><i class="fa fa-save fa-fw"></i>Save</a>
        <a href="#" id="DeletePatient"><i class="fa fa-remove fa-fw"></i>Delete</a>
        <a href="#" id="PrintPatientList"><i class="fa fa-print fa-fw"></i>Print</a>
        <a href="#" id="FilterPatient"><i class="fa fa-filter fa-fw"></i>Filter</a>
        <a href="#" id="ExportEmpoyeeList"><i class="fa fa-cog fa-fw"></i>Export</a>

    </div>

    <div class="st-content">

        <div class="container-fluid">

            <div class="page-header">
                <h3>Patient Case Paper</h3>
            </div>

            <div id="Loader" class="loader-container">
                <!--There's the container that centers it-->
                <div class="spinner-frame">
                    <!--The background-->
                    <div class="spinner-cover"></div>
                    <!--The foreground-->
                    <div class="spinner-bar"></div>
                    <!--and the spinny thing-->
                </div>
            </div>


            <!-- view mode -->
            <div id="ViewMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <!-- Filter Options -->

                        <div class="panel panel-default hide" id="SearchPatientPanel">

                            <div class="panel-heading">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <h4 class="panel-title panel-title-align-middle">Search Case Paper Details</h4>

                                    </div>

                                </div>

                            </div>

                            <div class="panel-body">

                                <div class="row">

                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                        <div class="col-lg-2 col-md-2 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Search Options</label>
                                                <select id="SearchOptions" class="form-control"></select>
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <label>Search Value</label>
                                                <input type="text" id="SearchValue" class="form-control" />
                                            </div>
                                        </div>

                                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                                            <div class="form-group form-group-md">
                                                <button type="button" id="SearchPatient" class="btn btn-info btn-md" style="margin-top: 26px;">Search</button>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <!-- Filter Options -->

                    </div>

                </div>

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h4 class="panel-title">List of Patients</h4>
                            </div>

                            <div class="panel-body">
                                <table id="PatientsList" class="table table-condesed">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Action</th>
                                            <th class="text-center">Company Name</th>
                                            <th class="text-center">Emp Code</th>
                                            <th class="text-center">Patient Name</th>
                                            <th class="text-center">Gender</th>
                                            <th class="text-center">Contact No.</th>
                                            <th class="text-center">Email Id</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>

                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">Page 1 of 5</div>
                                    <div class="col-lg-8 col-lg-8 col-sm-8 col-xs-12">
                                        <ul class="pagination pagination-sm pull-right">
                                            <li class="page-item">
                                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <!-- edit panel -->

            <div id="EditMode">

                <div class="row">

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                        <div class="panel panel-info">

                            <div class="panel-heading">
                                <h3 class="panel-title">Patient Details</h3>
                            </div>

                            <div class="panel-body">

                                <!-- START OF MAIN NAV TABS -->

                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#GeneralDetails" aria-controls="GeneralDetails" role="tab" data-toggle="tab" tabindex="10">General Details</a></li>
                                    <li role="presentation"><a href="#PersonalHistory" aria-controls="PersonalHistory" role="tab" data-toggle="tab" tabindex="10">Personal History</a></li>
                                    <li role="presentation"><a href="#PastAndPresentIllness" aria-controls="PastAndPresentIllness" role="tab" data-toggle="tab" tabindex="100">Past and Present Illness</a></li>
                                    <li role="presentation"><a href="#HistoryOfMajorIllness" aria-controls="HistoryOfMajorIllness" role="tab" data-toggle="tab" tabindex="300">History of Major Illness</a></li>
                                </ul>

                                <!-- START OF MAIN NAV TABS TAB CONTENT -->
                                <div class="tab-content">

                                    <!-- START OF GENERAL DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in active" id="GeneralDetails">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Emp Code</label>
                                                        <input type="text" id="PatientCode" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Title</label>
                                                        <select id="Title" class="form-control">
                                                            <option value="-1">Title</option>
                                                            <option value="1">Mr.</option>
                                                            <option value="2">Mrs.</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Company Name</label>
                                                        <input type="text" id="CompanyName" class="form-control" placeholder="Search by Company Code or Name" />
                                                    </div>

                                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                        <div id="SearchCompanyList" class="autocompleteList"></div>
                                                    </div>

                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>First Name</label>
                                                        <input type="text" id="FirstName" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Middle Name</label>
                                                        <input type="text" id="MiddleName" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Last Name</label>
                                                        <input type="text" id="LastName" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Address</label>
                                                        <textarea id="Address" class="form-control" rows="1"></textarea>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Date Of Birth</label>
                                                        <div class="input-group date input-group-md" id="DateOfBirthDatePicker">
                                                            <input type="text" id="DateOfBirth" class="form-control" />
                                                            <span class="input-group-addon">
                                                                <i class="fa fa-calendar"></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Age</label>
                                                        <input type="text" id="Age" class="form-control" disabled="disabled"/>
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <label for="Gender">Gender</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="Male" class="label-radio" name="Gender" value="Male" />
                                                            <span class="label-text">Male</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="Female" class="label-radio" name="Gender" checked="checked" value="Female" />
                                                            <span class="label-text">Female</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Email Id</label>
                                                        <input type="text" id="EmailId" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Contact No. 1</label>
                                                        <input type="text" id="ContactNo1" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Contact No. 2</label>
                                                        <input type="text" id="ContactNo2" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Mobile No. 1</label>
                                                        <input type="text" id="MobileNo1" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Mobile No. 2</label>
                                                        <input type="text" id="MobileNo2" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>PAN No.</label>
                                                        <input type="text" id="PANNo" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Department</label>
                                                        <input id="Department" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Designation</label>
                                                        <input id="Designation" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                    </div>

                                    <!-- END OF GENERAL DETAILS TAB PANE -->


                                    <!-- START OF PERSONAL DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in" id="PersonalHistory">

                                        <div class="panel-body">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <input type="hidden" id="PatientPersonalHistoryId" class="form-control"/>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Height (Cms)</label>
                                                        <input type="text" id="Height" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Weight (Kgs)</label>
                                                        <input type="text" id="Weight" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
                                                    <label for="MaritalStatus">Marital Status</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="Married" class="label-radio" name="MaritalStatus" value="Married" />
                                                            <span class="label-text">Married</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="UnMarried" class="label-radio" name="MaritalStatus" checked="checked" value="UnMarried" />
                                                            <span class="label-text">UnMarried</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Sons</label>
                                                        <input type="text" id="NoOfSons" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Daughters</label>
                                                        <input type="text" id="NoOfDaughters" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                                    <label>Smoking</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="SmokingYes" class="label-radio" name="Smoking" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="SmokingNo" class="label-radio" name="Smoking" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                                    <label>Alcohol</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="AlcoholYes" class="label-radio" name="AlcoholYes" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="AlcoholNo" class="label-radio" name="AlcoholNo" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div class="col-lg-1 col-md-1 col-sm-3 col-xs-12">
                                                    <label>Tobacco</label>
                                                    <div class="form-group form-group-sm">
                                                        <label class="lable-tick">
                                                            <input type="radio" id="TobaccoYes" class="label-radio" name="Tobacco" value="Yes" />
                                                            <span class="label-text">Yes</span>
                                                        </label>
                                                        <label class="lable-tick">
                                                            <input type="radio" id="TobaccoNo" class="label-radio" name="Tobacco" checked="checked" value="No" />
                                                            <span class="label-text">No</span>
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-2 col-md-2 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Blood Group</label>
                                                        <select id="BloodGroup" class="form-control"></select>
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Diet</label>
                                                        <input type="text" id="Diet" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Allergic To</label>
                                                        <input type="text" id="AllergicTo" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-4 col-md-4 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Other Addictions</label>
                                                        <input type="text" id="OtherAddictions" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <!-- END OF PERSONAL DETAILS TAB PANE  -->

                                    <!-- START OF PAST AND PRESENT ILLNESS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in" id="PastAndPresentIllness">

                                        <div class="panel-body">

                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Exercise Name</label>
                                                        <input type="text" id="Exercise" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Frequency</label>
                                                        <input type="text" id="Frequency" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-2 col-md-2 col-sm-2 col-xs-12">
                                                    <label></label>
                                                <button type="button" id="AddExerciseDetails" class="btn btn-info btn-sm" style="margin-top: 24px;">Add</button>
                                                    </div>

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div class="table-responsive">
                                    <table id="ExerciseList" class="table table-condesed">
                                        <thead>
                                            <tr>
                                                <th class="text-center">Exercise Name</th>
                                                <th class="text-center">Frequency</th>
                                                <th class="text-center">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Present Illness</label>
                                                        <input type="text" id="PresentIllness" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Treatment</label>
                                                        <input type="text" id="Treatment" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <!-- END OF PAST AND PRESENT ILLNESS DETAILS TAB PANE -->

                                    <!-- START OF HISTORY OF MAJOR ILLNESS DETAILS TAB PANE -->

                                    <div role="tabpanel" class="tab-pane fade in" id="HistoryOfMajorIllness">

                                        <div class="panel-body">

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Micturation</label>
                                                        <input type="text" id="Micturation" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Bowels</label>
                                                        <input type="text" id="Bowels" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Sleep</label>
                                                        <input type="text" id="Sleep" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-3 col-md-3 col-sm-2 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>M.C.</label>
                                                        <input type="text" id="MC" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Past History</label>
                                                        <input type="text" id="PastHistory" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                    <div class="form-group form-group-sm">
                                                        <label>Family History</label>
                                                        <input type="text" id="FamilyHistory" class="form-control" />
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <!-- END OF HISTORY OF MAJOR ILLNESS DETAILS TAB PANE -->


                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    <script type="text/javascript" src="../content/scripts/app/shared/default.js"></script>
    <script type="text/javascript" src="../content/scripts/app/Masters/patient.js"></script>

</asp:Content>
