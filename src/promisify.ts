export function promisify<T>(
	f: (cb: (err: any, res: T) => void) => void,
	thisContext?: any,
): () => Promise<T>;
export function promisify<A, T>(
	f: (arg: A, cb: (err: any, res: T) => void) => void,
	thisContext?: any,
): (arg: A) => Promise<T>;
export function promisify<A, A2, T>(
	f: (arg: A, arg2: A2, cb: (err: any, res: T) => void) => void,
	thisContext?: any,
): (arg: A, arg2: A2) => Promise<T>;
export function promisify<A, A2, A3, T>(
	f: (arg: A, arg2: A2, arg3: A3, cb: (err: any, res: T) => void) => void,
	thisContext?: any,
): (arg: A, arg2: A2, arg3: A3) => Promise<T>;
export function promisify<A, A2, A3, A4, T>(
	f: (
		arg: A,
		arg2: A2,
		arg3: A3,
		arg4: A4,
		cb: (err: any, res: T) => void,
	) => void,
	thisContext?: any,
): (arg: A, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;
export function promisify<A, A2, A3, A4, A5, T>(
	f: (
		arg: A,
		arg2: A2,
		arg3: A3,
		arg4: A4,
		arg5: A5,
		cb: (err: any, res: T) => void,
	) => void,
	thisContext?: any,
): (arg: A, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Promise<T>;
export function promisify(f: any, thisContext?: any) {
	return function (...args) {
		return new Promise((resolve, reject) => {
			function callback(err: any, result: any) {
				// на типизацию внутри коллбэка забили болт, нам по идее важно только то что оверлоады прописаны правильно в плане результат соллбэка
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			}

			args.push(callback);
			f.apply(thisContext, args);
		});
	};
}

type Callback<T> = (args: T) => void;
type PromisfiedFunction<A, R> = (args: A) => Promise<R>;
type OriginalFunction<A, R> = (args: A, cb: Callback<R>) => void;

function promisifyTS<A, R>(
	fn: OriginalFunction<A, R>,
): PromisfiedFunction<A, R> {
	return function (args: A) {
		return new Promise((resolve) => {
			// fn(args, callbackArgs => {
			// 	resolve(callbackArgs);
			// });
			fn(args, resolve);
		});
	};
}
