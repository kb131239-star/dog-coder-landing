import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const text = formData.get('text') as string;
    const file = formData.get('file') as File | null;
    const breed = formData.get('breed') as string;
    const age = formData.get('age') as string;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let prompt = "당신은 반려견 행동 분석 전문가입니다. ";
    prompt += "사용자가 제공하는 강아지의 행동 묘사나 이미지를 보고, 그 행동의 의미와 보호자가 해야 할 대처 방법을 친절하고 전문적으로 설명해주세요. ";
    
    if (breed || age) {
      prompt += `\n참고 정보: 견종은 ${breed || '알 수 없음'}이며, 나이는 ${age || '알 수 없음'}입니다. 이 정보를 바탕으로 더 구체적인 분석을 해주세요. `;
    }

    prompt += "결과는 반드시 '행동 의미', '대처 방법', '추가 팁' 세 가지 섹션으로 나누어 작성해주세요.";

    if (text) {
      prompt += `\n\n강아지 행동 묘사: ${text}`;
    }

    const parts: any[] = [{ text: prompt }];

    if (file) {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      parts.push({
        inlineData: {
          data: base64,
          mimeType: file.type,
        },
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    const analysis = response.text();

    return NextResponse.json({ analysis });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: '분석 중 오류가 발생했습니다. 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
