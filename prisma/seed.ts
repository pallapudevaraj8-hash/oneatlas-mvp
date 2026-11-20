import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
// All model prices and benchmark scores are ILLUSTRATIVE SAMPLE DATA, not live measurements.
const labs = [
  ["openai","OpenAI","O","General-purpose AI research and model development","https://openai.com"],
  ["anthropic","Anthropic","A","Claude AI models and safety research","https://anthropic.com"],
  ["google","Google DeepMind","G","Gemini models and AI research","https://deepmind.google"],
  ["meta","Meta","M","Llama open-weight AI models","https://ai.meta.com"],
  ["deepseek","DeepSeek","D","Language and reasoning models","https://deepseek.com"],
  ["mistral","Mistral AI","Mi","Language and coding models","https://mistral.ai"],
  ["alibaba","Alibaba Qwen","Q","Qwen language model family","https://qwenlm.github.io"],
  ["cohere","Cohere","C","Enterprise-focused language models","https://cohere.com"],
  ["xai","xAI","X","Grok model family","https://x.ai"]
] as const;
const providers = [
  ["openrouter","OpenRouter","OR","Multi-model gateway","https://openrouter.ai"],
  ["openai","OpenAI API","O","OpenAI developer APIs","https://platform.openai.com"],
  ["anthropic","Anthropic API","A","Claude developer APIs","https://docs.anthropic.com"],
  ["google","Google AI","G","Gemini developer APIs","https://ai.google.dev"],
  ["together","Together AI","T","Open-weight model inference","https://together.ai"],
  ["fireworks","Fireworks AI","F","Model inference platform","https://fireworks.ai"],
  ["groq","GroqCloud","Gr","Accelerated model inference","https://groq.com"]
] as const;
type DemoModel = [slug:string,name:string,lab:string,type:string,context:number,output:number,open:boolean,input:number,outputPrice:number,providerList:string,capabilities:string,modalities:string,scores:number[],date:string,description:string];
const models: DemoModel[] = [
  ["gpt-4o","GPT-4o","openai","Multimodal",128000,16384,false,2.5,10,"openai,openrouter","Vision,Tools,JSON,Multilingual","Text,Image",[88,83,80,78,92],"2024-05-13","General-purpose multimodal model for assistant and visual workflows."],
  ["gpt-4o-mini","GPT-4o mini","openai","Multimodal",128000,16384,false,.15,.6,"openai,openrouter","Vision,Tools,JSON,Multilingual","Text,Image",[75,71,70,68,80],"2024-07-18","Compact multimodal model for affordable applications."],
  ["o1","o1","openai","Reasoning",200000,100000,false,15,60,"openai,openrouter","Reasoning,Code,Vision","Text,Image",[92,87,96,95,75],"2024-12-17","Reasoning-oriented AI model for multi-step problem solving."],
  ["claude-3-5-sonnet","Claude 3.5 Sonnet","anthropic","Multimodal",200000,8192,false,3,15,"anthropic,openrouter","Vision,Code,Tools,Reasoning","Text,Image",[90,92,88,84,90],"2024-06-20","Multimodal language assistant with coding and writing capabilities."],
  ["claude-3-5-haiku","Claude 3.5 Haiku","anthropic","Text",200000,8192,false,.8,4,"anthropic,openrouter","Tools,Code,Multilingual","Text",[77,79,72,70,65],"2024-11-04","Fast language model for everyday developer workflows."],
  ["claude-3-opus","Claude 3 Opus","anthropic","Multimodal",200000,4096,false,15,75,"anthropic,openrouter","Vision,Reasoning,Code","Text,Image",[86,83,86,84,91],"2024-03-04","Large language and vision assistant for complex tasks."],
  ["gemini-1-5-pro","Gemini 1.5 Pro","google","Multimodal",1000000,8192,false,1.25,5,"google,openrouter","Long context,Vision,Tools,Code","Text,Image,Audio,Video",[88,86,87,85,95],"2024-02-15","Multimodal model known for long-context input."],
  ["gemini-1-5-flash","Gemini 1.5 Flash","google","Multimodal",1000000,8192,false,.075,.3,"google,openrouter","Long context,Vision,Tools,Multilingual","Text,Image,Audio,Video",[76,73,75,71,85],"2024-05-14","Fast, lower-cost multimodal language model."],
  ["gemini-2-0-flash","Gemini 2.0 Flash","google","Multimodal",1000000,8192,false,.1,.4,"google,openrouter","Long context,Vision,Tools,Code","Text,Image,Audio",[85,81,83,79,90],"2025-02-05","Multimodal model for responsive AI assistant applications."],
  ["llama-3-1-405b","Llama 3.1 405B","meta","Text",128000,8192,true,3.5,3.5,"together,fireworks,openrouter","Tools,Code,Multilingual","Text",[86,83,79,82,62],"2024-07-23","Large open-weight Llama language model."],
  ["llama-3-1-70b","Llama 3.1 70B","meta","Text",128000,8192,true,.6,.6,"together,fireworks,groq","Tools,Code,Multilingual","Text",[79,78,74,73,61],"2024-07-23","Mid-size open-weight model balancing performance and cost."],
  ["llama-3-1-8b","Llama 3.1 8B","meta","Text",128000,8192,true,.06,.06,"together,fireworks,groq","Tools,Multilingual","Text",[64,59,57,55,45],"2024-07-23","Lightweight open-weight model for economical inference."],
  ["deepseek-v3","DeepSeek V3","deepseek","Text",64000,8192,true,.27,1.1,"openrouter,together,fireworks","Code,Tools,Reasoning,Multilingual","Text",[89,91,87,88,64],"2024-12-26","Open-weight mixture-of-experts model."],
  ["deepseek-r1","DeepSeek R1","deepseek","Reasoning",64000,8192,true,.55,2.19,"openrouter,together,fireworks","Reasoning,Code,Multilingual","Text",[91,89,95,93,60],"2025-01-20","Open-weight reasoning model."],
  ["mistral-large-2","Mistral Large 2","mistral","Text",128000,8192,false,2,6,"openrouter,fireworks","Code,Tools,JSON,Multilingual","Text",[84,87,80,81,63],"2024-07-24","Multilingual language model for general and code tasks."],
  ["codestral","Codestral","mistral","Code",32000,8192,false,.3,.9,"openrouter,fireworks","Code,JSON","Text",[73,89,72,76,28],"2024-05-29","Code-focused model for developer tasks."],
  ["qwen2-5-72b","Qwen2.5 72B","alibaba","Text",128000,8192,true,.4,.8,"openrouter,together,fireworks","Code,Multilingual,Tools","Text",[84,83,81,80,67],"2024-09-19","Open-weight multilingual Qwen language model."],
  ["command-r-plus","Command R+","cohere","Text",128000,4096,false,2.5,10,"openrouter","Tools,Multilingual,Long context","Text",[78,71,73,69,53],"2024-04-04","Retrieval-oriented enterprise language model."],
  ["grok-2","Grok 2","xai","Multimodal",128000,8192,false,2,10,"openrouter","Vision,Reasoning,Tools","Text,Image",[85,80,83,82,89],"2024-08-13","Text and image conversational AI model."]
];
async function main() {
  await db.benchmark.deleteMany(); await db.modelAvailability.deleteMany();
  await db.model.deleteMany(); await db.provider.deleteMany(); await db.lab.deleteMany();
  const labIds:Record<string,string>={}; const providerIds:Record<string,string>={};
  for (const [slug,name,initials,description,website] of labs) {
    labIds[slug]=(await db.lab.create({data:{slug,name,initials,description,website}})).id;
  }
  for (const [slug,name,initials,description,website] of providers) {
    providerIds[slug]=(await db.provider.create({data:{slug,name,initials,description,website}})).id;
  }
  const names=["Intelligence","Coding","Reasoning","Math","Multimodal"];
  for (const [slug,name,lab,type,contextWindow,maxOutput,openWeights,inputPrice,outputPrice,providerList,capabilityList,modalityList,scores,date,description] of models) {
    const model=await db.model.create({data:{slug,name,labId:labIds[lab],type,contextWindow,maxOutput,openWeights,description,
      releasedAt:new Date(date+"T00:00:00.000Z"),modalities:modalityList.split(","),capabilities:capabilityList.split(",")}});
    await db.modelAvailability.createMany({data:providerList.split(",").map((p,i)=>({modelId:model.id,providerId:providerIds[p],
      inputPrice:+(inputPrice*(1+i*.12)).toFixed(4),outputPrice:+(outputPrice*(1+i*.12)).toFixed(4)}))});
    await db.benchmark.createMany({data:names.map((category,i)=>({modelId:model.id,category,score:scores[i]}))});
  }
  console.log(`Seeded ${models.length} model records, ${labs.length} labs and ${providers.length} providers.`);
  console.log("NOTICE: All numeric values for prices and benchmarks are SAMPLE DATA, not live data.");
}
main().catch((e)=>{console.error(e);process.exitCode=1;}).finally(()=>db.$disconnect());
