import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const VooAgricola = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    propriedade: "",
    setor: "",
    cultura: "",
    estagio: "",
    area: "",
    altitudeVoo: "",
    velocidade: "",
    tempoVoo: "",
    bateriaUsada: "",
    operador: "",
    objetivoVoo: "",
    temperatura: "",
    umidade: "",
    vento: "",
    visibilidade: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Relatório de Voo Agrícola Salvo!",
      description: "Os dados foram registrados com sucesso no sistema.",
    });
    
    // Reset form
    setFormData({
      propriedade: "",
      setor: "",
      cultura: "",
      estagio: "",
      area: "",
      altitudeVoo: "",
      velocidade: "",
      tempoVoo: "",
      bateriaUsada: "",
      operador: "",
      objetivoVoo: "",
      temperatura: "",
      umidade: "",
      vento: "",
      visibilidade: "",
      observacoes: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-agriculture">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <Plane className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Relatório de Voo Agrícola</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-agriculture">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Cadastro de Voo Agrícola - HD540s</CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Registre informações detalhadas sobre o voo de monitoramento agrícola
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informações da Propriedade */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="propriedade">Nome da Propriedade</Label>
                    <Input
                      id="propriedade"
                      value={formData.propriedade}
                      onChange={(e) => handleChange("propriedade", e.target.value)}
                      placeholder="Ex: Fazenda Boa Esperança"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setor">Setor/Talhão</Label>
                    <Input
                      id="setor"
                      value={formData.setor}
                      onChange={(e) => handleChange("setor", e.target.value)}
                      placeholder="Ex: Setor B - Talhão 15"
                      required
                    />
                  </div>
                </div>

                {/* Informações da Cultura */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cultura">Tipo de Cultura</Label>
                    <Select value={formData.cultura} onValueChange={(value) => handleChange("cultura", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a cultura" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="soja">Soja</SelectItem>
                        <SelectItem value="milho">Milho</SelectItem>
                        <SelectItem value="algodao">Algodão</SelectItem>
                        <SelectItem value="cana">Cana-de-açúcar</SelectItem>
                        <SelectItem value="cafe">Café</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estagio">Estágio da Cultura</Label>
                    <Select value={formData.estagio} onValueChange={(value) => handleChange("estagio", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estágio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="germinacao">Germinação</SelectItem>
                        <SelectItem value="vegetativo">Vegetativo</SelectItem>
                        <SelectItem value="florescimento">Florescimento</SelectItem>
                        <SelectItem value="enchimento">Enchimento de grãos</SelectItem>
                        <SelectItem value="maturo">Maturo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Área Monitorada (hectares)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleChange("area", e.target.value)}
                      placeholder="Ex: 200"
                      required
                    />
                  </div>
                </div>

                {/* Parâmetros de Voo */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="altitudeVoo">Altitude (metros)</Label>
                    <Input
                      id="altitudeVoo"
                      type="number"
                      value={formData.altitudeVoo}
                      onChange={(e) => handleChange("altitudeVoo", e.target.value)}
                      placeholder="Ex: 50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="velocidade">Velocidade (m/s)</Label>
                    <Input
                      id="velocidade"
                      type="number"
                      step="0.1"
                      value={formData.velocidade}
                      onChange={(e) => handleChange("velocidade", e.target.value)}
                      placeholder="Ex: 8.0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tempoVoo">Tempo de Voo (min)</Label>
                    <Input
                      id="tempoVoo"
                      type="number"
                      value={formData.tempoVoo}
                      onChange={(e) => handleChange("tempoVoo", e.target.value)}
                      placeholder="Ex: 45"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bateriaUsada">Bateria Usada (%)</Label>
                    <Input
                      id="bateriaUsada"
                      type="number"
                      value={formData.bateriaUsada}
                      onChange={(e) => handleChange("bateriaUsada", e.target.value)}
                      placeholder="Ex: 75"
                      required
                    />
                  </div>
                </div>

                {/* Objetivo e Operador */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="objetivoVoo">Objetivo do Voo</Label>
                    <Select value={formData.objetivoVoo} onValueChange={(value) => handleChange("objetivoVoo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monitoramento">Monitoramento de saúde da cultura</SelectItem>
                        <SelectItem value="pragas">Detecção de pragas</SelectItem>
                        <SelectItem value="doencas">Identificação de doenças</SelectItem>
                        <SelectItem value="irrigacao">Avaliação de irrigação</SelectItem>
                        <SelectItem value="mapeamento">Mapeamento da área</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operador">Piloto/Operador</Label>
                    <Input
                      id="operador"
                      value={formData.operador}
                      onChange={(e) => handleChange("operador", e.target.value)}
                      placeholder="Nome do operador"
                      required
                    />
                  </div>
                </div>

                {/* Condições Climáticas */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="temperatura">Temperatura (°C)</Label>
                    <Input
                      id="temperatura"
                      type="number"
                      value={formData.temperatura}
                      onChange={(e) => handleChange("temperatura", e.target.value)}
                      placeholder="Ex: 28"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="umidade">Umidade (%)</Label>
                    <Input
                      id="umidade"
                      type="number"
                      value={formData.umidade}
                      onChange={(e) => handleChange("umidade", e.target.value)}
                      placeholder="Ex: 70"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vento">Vento (km/h)</Label>
                    <Input
                      id="vento"
                      type="number"
                      step="0.1"
                      value={formData.vento}
                      onChange={(e) => handleChange("vento", e.target.value)}
                      placeholder="Ex: 12.5"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="visibilidade">Visibilidade</Label>
                    <Select value={formData.visibilidade} onValueChange={(value) => handleChange("visibilidade", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Condição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excelente">Excelente</SelectItem>
                        <SelectItem value="boa">Boa</SelectItem>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="ruim">Ruim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações e Resultados</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleChange("observacoes", e.target.value)}
                    placeholder="Registre observações importantes, anomalias detectadas, recomendações..."
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button asChild variant="outline">
                    <Link to="/">Cancelar</Link>
                  </Button>
                  <Button type="submit" className="bg-gradient-primary hover:bg-agriculture-primary/90">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Relatório
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default VooAgricola;