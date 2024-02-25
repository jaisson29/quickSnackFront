// declarations.d.ts

declare module '*.*' {
	const value: any;
	export default value;
}

declare module '*.png' {
	const value: any;
	export default value;
}

declare module '*.jpg' {
	const value: any;
	export default value;
}

declare module '*.svg' {
	const value: any;
	export default value;
}

declare module '*.webp' {
	const value: any;
	export default value;
}

declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}

