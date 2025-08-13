import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { DataService } from "../../service/data.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
// import { AppMsalService } from "../../app-msal.service";
// import { UserProfiles } from "../../models/user-profile.model";
import { HeaderComponent } from "../header/header.component";
import { GetAbbottApp } from "../../models/abbott-app.model";

@Component({
  selector: "app-abbott-app-json-sender",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: "./abbott-app-json-sender.component.html",
  styleUrl: "./abbott-app-json-sender.component.scss",
})
export class AbbottAppJsonSenderComponent implements OnInit {
  myForm: FormGroup;
  options: string[] = ["Option 1", "Option 2", "Option 3"];
  response: any;
  getAbbottApp: GetAbbottApp[] = [];
  aliasName = "";
  // userProfile: UserProfiles;
  accessToken: string = "";

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    // private appMsalService: AppMsalService,
  ) {
    // this.userProfile = window.sessionStorage.getItem("userProfile")
    //   ? JSON.parse(window.sessionStorage.getItem("userProfile") as string)
    //   : null;
    this.myForm = this.fb.group({
      abbottApp: ["", Validators.required],
      inputJson: ["", Validators.required],
    });
  }

  // logOutEmitter(event: boolean) {
  //   if (event) {
  //     this.logout();
  //   }
  // }

  // logout(): void {
  //   this.appMsalService.logoutUser();
  //   history.pushState(null, "");
  //   window.localStorage.clear();
  // }

  ngOnInit(): void {
    this.getAbbottAppDDLValue();
  }

  onSubmit() {
    if (this.myForm.valid) {
      try {
        this.response = "...loading";
        const inputJsonValue = this.myForm.value.inputJson;
        const parsedJson = JSON.parse(inputJsonValue);

        this.dataService
          .receiveFromApp(this.aliasName ?? "", parsedJson)
          .subscribe({
            next: (res) => {
              this.response = res;
              console.log("res", res);
            },
            error: (err) => {
              console.error("Error:", err);
              this.response =
                "An error occurred while processing your request.";
            },
            complete: () => {
              console.log("Request completed.");
            },
          });
      } catch (e) {
        console.log(e);
        this.response = "Invalid JSON";
      }
    }
  }

  getAbbottAppDDLValue() {
    // this.dataService.getAbbottApp().subscribe((response: GetAbbottApp[]) => {
    //   this.getAbbottApp = response;
    // });
    this.getAbbottApp = [
      {
        "createdBy": "admin",
        "updatedBy": null,
        "createdAt": null,
        "updatedAt": null,
        "isDeleted": false,
        "comments": null,
        "id": 1,
        "displayName": "APP1",
        "aliasName": "APP1",
        "buId": 1,
        "startDate": null,
        "endDate": null
      },
      {
        "createdBy": "admin",
        "updatedBy": null,
        "createdAt": null,
        "updatedAt": null,
        "isDeleted": false,
        "comments": null,
        "id": 2,
        "displayName": "APP2",
        "aliasName": "APP2",
        "buId": 2,
        "startDate": null,
        "endDate": null
      },
      {
        "createdBy": "admin",
        "updatedBy": null,
        "createdAt": null,
        "updatedAt": null,
        "isDeleted": false,
        "comments": null,
        "id": 3,
        "displayName": "APP3",
        "aliasName": "APP3",
        "buId": 3,
        "startDate": null,
        "endDate": null
      },
      {
        "createdBy": "admin",
        "updatedBy": null,
        "createdAt": null,
        "updatedAt": null,
        "isDeleted": false,
        "comments": null,
        "id": 4,
        "displayName": "APP4",
        "aliasName": "APP4",
        "buId": 4,
        "startDate": null,
        "endDate": null
      },
      {
        "createdBy": "admin",
        "updatedBy": null,
        "createdAt": null,
        "updatedAt": null,
        "isDeleted": false,
        "comments": null,
        "id": 5,
        "displayName": "APP5",
        "aliasName": "APP5",
        "buId": 5,
        "startDate": null,
        "endDate": null
      },
      {
        "createdBy": "admin",
        "updatedBy": null,
        "createdAt": null,
        "updatedAt": null,
        "isDeleted": false,
        "comments": null,
        "id": 6,
        "displayName": "APP6",
        "aliasName": "APP6",
        "buId": 6,
        "startDate": null,
        "endDate": null
      }
    ]
  }

  onAbbottAppChange(value: number) {
    this.aliasName = this.getAbbottApp.filter(
      (x) => x.id === value,
    )[0]?.aliasName;
    this.dataService.tokenAbbottAppId(value).subscribe((res) => {
      this.accessToken = res.accessToken;
      localStorage.setItem("appToken", this.accessToken || "");
      console.log("AbbottAppId", res);
    });
  }

  beautifyJson() {
    try {
      const parsedJson = JSON.parse(this.myForm.value.inputJson);
      this.myForm.patchValue({
        inputJson: JSON.stringify(parsedJson, null, 2),
      });
    } catch (e) {
      this.response = "Invalid JSON";
    }
  }

  copyToClipboard() {
    const responseElement = document?.getElementById("responseText");
    const responseText = responseElement ? responseElement.innerText : "";
    navigator.clipboard
      .writeText(responseText)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  }
}
