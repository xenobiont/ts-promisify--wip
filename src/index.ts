// type Callback<TReturn> = (args: TReturn) => void;

// 		function promisify<TArgs, TReturn>(
// 			fn: (args: TArgs, cb: Callback<TReturn>) => void,
// 		): (args: TArgs) => Promise<TReturn> {
// 			return function (args: TArgs) {
// 				return new Promise(resolve => {
// 					fn(args, callbackArgs => {
// 						resolve(callbackArgs);
// 					});
// 				});
// 			};
// 		}

// 		const res = promisify(myFunc);
// 	}

// 	static promisify(f, manyArgs = false) {
// 		return function (...args) {
// 			return new Promise((resolve, reject) => {
// 				function callback(err, ...results) {
// 					if (err) {
// 						reject(err);
// 					} else {
// 						resolve(manyArgs ? results : results[0]);
// 					}
// 				}

// 				args.push(callback);

// 				f.call(this, ...args);
// 			});
// 		};
// 	}

type Callback<TReturn> = (args: TReturn) => void;

function promisify<TArgs, TReturn>(
	fn: (cb: Callback<TReturn>) => void,
): (args: TArgs) => Promise<TReturn> {
	return function (args: TArgs) {
		return new Promise((resolve) => {
			fn((callbackArgs) => {
				resolve(callbackArgs);
			});
		});
	};
}

const pst = promisify(setTimeout);
