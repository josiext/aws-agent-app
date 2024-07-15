"use server";

import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";

export const invokeBedrockAgent = async (formData: FormData) => {
  const prompt = formData.get("prompt");
  /*   const sessionId = formData.get("session");
   */

  const sessionId = "session-1";
  console.log("aqui", prompt);

  const client = new BedrockAgentRuntimeClient({
    region: process.env.AGENT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const agentId = process.env.AGENT_ID;
  const agentAliasId = process.env.AGENT_ALIAS;

  const command = new InvokeAgentCommand({
    agentId,
    agentAliasId,
    sessionId,
    inputText: prompt,
  });

  try {
    let completion = "";
    const response = await client.send(command);

    if (response.completion === undefined) {
      throw new Error("Completion is undefined");
    }

    for await (let chunkEvent of response.completion) {
      const chunk = chunkEvent.chunk;
      console.log(chunk);
      const decodedResponse = new TextDecoder("utf-8").decode(chunk.bytes);
      completion += decodedResponse;
    }

    console.log("Completion: ", completion);

    return { sessionId: sessionId, completion };
  } catch (err) {
    console.error(err);
  }
};
