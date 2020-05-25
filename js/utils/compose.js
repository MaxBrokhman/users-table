export const compose = (...functions) => (value) => 
functions.reduceRight((acc, fn) => fn(acc), value)
