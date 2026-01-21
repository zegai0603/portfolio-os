export interface Theme {
    id: string;
    label: string;
    type: "dark" | "light";
    colors: {
        "--vscode-bg": string;
        "--vscode-sidebar": string;
        "--vscode-activity-bar": string;
        "--vscode-border": string;
        "--vscode-active": string;
        "--vscode-text": string;
        "--vscode-text-muted": string;
        "--vscode-gutter": string;
        "--vscode-editor-bg": string;
        "--vscode-tab-active-bg": string;
        "--vscode-tab-inactive-bg": string;
        "--vscode-terminal-bg": string;
        "--vscode-selection": string;
        "--vscode-line-highlight": string;

        // Syntax
        "--syntax-keyword": string;
        "--syntax-string": string;
        "--syntax-function": string;
        "--syntax-variable": string;
        "--syntax-comment": string;
        "--syntax-number": string;
        "--syntax-class": string;
    }
}

export const THEMES: Theme[] = [
    {
        id: "dark-plus",
        label: "Dark+ (Default)",
        type: "dark",
        colors: {
            "--vscode-bg": "#0D1117",
            "--vscode-sidebar": "#161B22",
            "--vscode-activity-bar": "#0D1117",
            "--vscode-border": "#30363D",
            "--vscode-active": "#58A6FF",
            "--vscode-text": "#C9D1D9",
            "--vscode-text-muted": "#8B949E",
            "--vscode-gutter": "#8B949E",
            "--vscode-editor-bg": "#0D1117",
            "--vscode-tab-active-bg": "#0D1117",
            "--vscode-tab-inactive-bg": "#161B22",
            "--vscode-terminal-bg": "#0D1117",
            "--vscode-selection": "#264F78",
            "--vscode-line-highlight": "#161B22",

            "--syntax-keyword": "#FF7B72",
            "--syntax-string": "#A5D6FF",
            "--syntax-function": "#D2A8FF",
            "--syntax-variable": "#FFA657",
            "--syntax-comment": "#8B949E",
            "--syntax-number": "#79C0FF",
            "--syntax-class": "#7EE787",
        }
    },
    {
        id: "light-plus",
        label: "Light+",
        type: "light",
        colors: {
            "--vscode-bg": "#FFFFFF",
            "--vscode-sidebar": "#F3F3F3",
            "--vscode-activity-bar": "#2C2C2C",
            "--vscode-border": "#E4E4E4",
            "--vscode-active": "#0090F1",
            "--vscode-text": "#333333",
            "--vscode-text-muted": "#666666",
            "--vscode-gutter": "#CCCCCC",
            "--vscode-editor-bg": "#FFFFFF",
            "--vscode-tab-active-bg": "#FFFFFF",
            "--vscode-tab-inactive-bg": "#ECECEC",
            "--vscode-terminal-bg": "#FFFFFF",
            "--vscode-selection": "#ADD6FF",
            "--vscode-line-highlight": "#F0F0F0",

            "--syntax-keyword": "#AF00DB",
            "--syntax-string": "#A31515",
            "--syntax-function": "#795E26",
            "--syntax-variable": "#001080",
            "--syntax-comment": "#008000",
            "--syntax-number": "#098658",
            "--syntax-class": "#267F99",
        }
    },
    {
        id: "github-dark",
        label: "GitHub Dark",
        type: "dark",
        colors: {
            "--vscode-bg": "#0d1117",
            "--vscode-sidebar": "#161b22",
            "--vscode-activity-bar": "#0d1117",
            "--vscode-border": "#30363d",
            "--vscode-active": "#1f6feb",
            "--vscode-text": "#c9d1d9",
            "--vscode-text-muted": "#8b949e",
            "--vscode-gutter": "#6e7681",
            "--vscode-editor-bg": "#0d1117",
            "--vscode-tab-active-bg": "#0d1117",
            "--vscode-tab-inactive-bg": "#010409",
            "--vscode-terminal-bg": "#0d1117",
            "--vscode-selection": "#1f6feb40",
            "--vscode-line-highlight": "#6e76811a",

            "--syntax-keyword": "#ff7b72",
            "--syntax-string": "#a5d6ff",
            "--syntax-function": "#d2a8ff",
            "--syntax-variable": "#ffa657",
            "--syntax-comment": "#8b949e",
            "--syntax-number": "#79c0ff",
            "--syntax-class": "#f0883e",
        }
    },
    {
        id: "monokai",
        label: "Monokai",
        type: "dark",
        colors: {
            "--vscode-bg": "#272822",
            "--vscode-sidebar": "#1e1f1c",
            "--vscode-activity-bar": "#1e1f1c",
            "--vscode-border": "#414339",
            "--vscode-active": "#f92672",
            "--vscode-text": "#f8f8f2",
            "--vscode-text-muted": "#75715e",
            "--vscode-gutter": "#75715e",
            "--vscode-editor-bg": "#272822",
            "--vscode-tab-active-bg": "#272822",
            "--vscode-tab-inactive-bg": "#34352f",
            "--vscode-terminal-bg": "#272822",
            "--vscode-selection": "#49483e",
            "--vscode-line-highlight": "#3e3d32",

            "--syntax-keyword": "#f92672",
            "--syntax-string": "#e6db74",
            "--syntax-function": "#a6e22e",
            "--syntax-variable": "#fd971f",
            "--syntax-comment": "#75715e",
            "--syntax-number": "#ae81ff",
            "--syntax-class": "#66d9ef",
        }
    },
    {
        id: "dracula",
        label: "Dracula",
        type: "dark",
        colors: {
            "--vscode-bg": "#282a36",
            "--vscode-sidebar": "#21222c",
            "--vscode-activity-bar": "#191a21",
            "--vscode-border": "#44475a",
            "--vscode-active": "#bd93f9",
            "--vscode-text": "#f8f8f2",
            "--vscode-text-muted": "#6272a4",
            "--vscode-gutter": "#6272a4",
            "--vscode-editor-bg": "#282a36",
            "--vscode-tab-active-bg": "#282a36",
            "--vscode-tab-inactive-bg": "#21222c",
            "--vscode-terminal-bg": "#282a36",
            "--vscode-selection": "#44475a",
            "--vscode-line-highlight": "#44475a",

            "--syntax-keyword": "#ff79c6",
            "--syntax-string": "#f1fa8c",
            "--syntax-function": "#50fa7b",
            "--syntax-variable": "#8be9fd",
            "--syntax-comment": "#6272a4",
            "--syntax-number": "#bd93f9",
            "--syntax-class": "#8be9fd",
        }
    }
];

export const DEFAULT_THEME = THEMES[0];
