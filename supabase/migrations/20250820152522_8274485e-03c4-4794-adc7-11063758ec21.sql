-- Create tables for agricultural reports
CREATE TABLE public.relatorio_pulverizacao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data_voo DATE NOT NULL,
  area_hectares DECIMAL(10,2) NOT NULL,
  cultura TEXT NOT NULL,
  produto TEXT NOT NULL,
  dose_hectare DECIMAL(8,2) NOT NULL,
  volume_calda DECIMAL(8,2) NOT NULL,
  altura_voo INTEGER NOT NULL,
  velocidade DECIMAL(5,2) NOT NULL,
  temperatura DECIMAL(4,1),
  umidade INTEGER,
  vento_velocidade DECIMAL(4,1),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.relatorio_voo_agricola (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data_voo DATE NOT NULL,
  area_hectares DECIMAL(10,2) NOT NULL,
  cultura TEXT NOT NULL,
  tipo_operacao TEXT NOT NULL,
  altitude_voo INTEGER NOT NULL,
  velocidade DECIMAL(5,2) NOT NULL,
  tempo_voo INTEGER NOT NULL,
  temperatura DECIMAL(4,1),
  umidade INTEGER,
  vento_velocidade DECIMAL(4,1),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.relatorio_solido (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data_aplicacao DATE NOT NULL,
  area_hectares DECIMAL(10,2) NOT NULL,
  cultura TEXT NOT NULL,
  produto TEXT NOT NULL,
  quantidade_kg DECIMAL(8,2) NOT NULL,
  dose_hectare DECIMAL(8,2) NOT NULL,
  altura_aplicacao INTEGER NOT NULL,
  velocidade DECIMAL(5,2) NOT NULL,
  temperatura DECIMAL(4,1),
  umidade INTEGER,
  vento_velocidade DECIMAL(4,1),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.relatorio_pulverizacao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorio_voo_agricola ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.relatorio_solido ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for pulverizacao
CREATE POLICY "Users can view their own pulverizacao reports" 
ON public.relatorio_pulverizacao 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pulverizacao reports" 
ON public.relatorio_pulverizacao 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pulverizacao reports" 
ON public.relatorio_pulverizacao 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pulverizacao reports" 
ON public.relatorio_pulverizacao 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for voo agricola
CREATE POLICY "Users can view their own voo agricola reports" 
ON public.relatorio_voo_agricola 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own voo agricola reports" 
ON public.relatorio_voo_agricola 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own voo agricola reports" 
ON public.relatorio_voo_agricola 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own voo agricola reports" 
ON public.relatorio_voo_agricola 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for solido
CREATE POLICY "Users can view their own solido reports" 
ON public.relatorio_solido 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own solido reports" 
ON public.relatorio_solido 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own solido reports" 
ON public.relatorio_solido 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own solido reports" 
ON public.relatorio_solido 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_pulverizacao_updated_at
  BEFORE UPDATE ON public.relatorio_pulverizacao
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_voo_agricola_updated_at
  BEFORE UPDATE ON public.relatorio_voo_agricola
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_solido_updated_at
  BEFORE UPDATE ON public.relatorio_solido
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();