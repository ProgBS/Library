
import { dirname , fromFileUrl } 
from 'https://deno.land/std@0.159.0/path/mod.ts';


export default dirname(fromFileUrl(import.meta.url));