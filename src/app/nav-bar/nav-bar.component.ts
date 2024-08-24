import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
})
export class NavbarComponent implements OnInit {
  theme: string = this.getPreferredTheme();

  ngOnInit(): void {
    this.applyTheme(this.theme);
  }

  toggleTheme(): void {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.setStoredTheme(this.theme);
    this.applyTheme(this.theme);
  }

  private applyTheme(theme: string): void {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }

  private getStoredTheme(): string | null {
    return localStorage.getItem("theme");
  }

  private setStoredTheme(theme: string): void {
    localStorage.setItem("theme", theme);
  }

  private getPreferredTheme(): string {
    const storedTheme = this.getStoredTheme();
    return storedTheme
      ? storedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
}
