import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Solido = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    propriedade: "",
    area: "",
    tipoSolido: "",
    produto: "",
    quantidade: "",
    dosagem: "",
    larguraBarra: "",
    velocidade: "",
    altitude: "",
    padraoAplicacao: "",
    operador: "",
    temperatura: "",
    umidade: "",
    vento: "",
    condicoesSolo: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Relatório de Aplicação de Sólido Salvo!",
      description: "Os dados foram registrados com sucesso no sistema.",
    });
    
    // Reset form
    setFormData({
      propriedade: "",
      area: "",
      tipoSolido: "",
      produto: "",
      quantidade: "",
      dosagem: "",
      larguraBarra: "",
      velocidade: "",
      altitude: "",
      padraoAplicacao: "",
      operador: "",
      temperatura: "",
      umidade: "",
      vento: "",
      condicoesSolo: "",
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
              <Package className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Relatório de Aplicação de Sólido</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-agriculture">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Cadastro de Aplicação de Sólido - HD540s</CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Registre informações sobre aplicação de fertilizantes, sementes e outros materiais sólidos
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informações da Área */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="propriedade">Nome da Propriedade</Label>
                    <Input
                      id="propriedade"
                      value={formData.propriedade}
                      onChange={(e) => handleChange("propriedade", e.target.value)}
                      placeholder="Ex: Sítio Vale Verde"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Área Tratada (hectares)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleChange("area", e.target.value)}
                      placeholder="Ex: 80"
                      required
                    />
                  </div>
                </div>

                {/* Informações do Produto */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tipoSolido">Tipo de Material</Label>
                    <Select value={formData.tipoSolido} onValueChange={(value) => handleChange("tipoSolido", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fertilizante">Fertilizante Granulado</SelectItem>
                        <SelectItem value="sementes">Sementes</SelectItem>
                        <SelectItem value="calcario">Calcário</SelectItem>
                        <SelectItem value="gesso">Gesso Agrícola</SelectItem>
                        <SelectItem value="adubo">Adubo Orgânico</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="produto">Nome do Produto</Label>
                    <Input
                      id="produto"
                      value={formData.produto}
                      onChange={(e) => handleChange("produto", e.target.value)}
                      placeholder="Ex: NPK 20-05-20"
                      required
                    />
                  </div>
                </div>

                {/* Quantidade e Dosagem */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="quantidade">Quantidade Total (kg)</Label>
                    <Input
                      id="quantidade"
                      type="number"
                      value={formData.quantidade}
                      onChange={(e) => handleChange("quantidade", e.target.value)}
                      placeholder="Ex: 2400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosagem">Dosagem (kg/ha)</Label>
                    <Input
                      id="dosagem"
                      type="number"
                      step="0.1"
                      value={formData.dosagem}
                      onChange={(e) => handleChange("dosagem", e.target.value)}
                      placeholder="Ex: 300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="larguraBarra">Largura da Barra (m)</Label>
                    <Input
                      id="larguraBarra"
                      type="number"
                      step="0.1"
                      value={formData.larguraBarra}
                      onChange={(e) => handleChange("larguraBarra", e.target.value)}
                      placeholder="Ex: 8.0"
                      required
                    />
                  </div>
                </div>

                {/* Parâmetros de Aplicação */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="velocidade">Velocidade (m/s)</Label>
                    <Input
                      id="velocidade"
                      type="number"
                      step="0.1"
                      value={formData.velocidade}
                      onChange={(e) => handleChange("velocidade", e.target.value)}
                      placeholder="Ex: 6.0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altitude">Altitude (metros)</Label>
                    <Input
                      id="altitude"
                      type="number"
                      value={formData.altitude}
                      onChange={(e) => handleChange("altitude", e.target.value)}
                      placeholder="Ex: 4"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="padraoAplicacao">Padrão de Aplicação</Label>
                    <Select value={formData.padraoAplicacao} onValueChange={(value) => handleChange("padraoAplicacao", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o padrão" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uniforme">Uniforme</SelectItem>
                        <SelectItem value="localizada">Localizada</SelectItem>
                        <SelectItem value="sulco">No sulco</SelectItem>
                        <SelectItem value="cobertura">Cobertura</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Operador */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="operador">Operador</Label>
                    <Input
                      id="operador"
                      value={formData.operador}
                      onChange={(e) => handleChange("operador", e.target.value)}
                      placeholder="Nome do piloto responsável"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condicoesSolo">Condições do Solo</Label>
                    <Select value={formData.condicoesSolo} onValueChange={(value) => handleChange("condicoesSolo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a condição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seco">Seco</SelectItem>
                        <SelectItem value="umido">Úmido</SelectItem>
                        <SelectItem value="preparado">Preparado</SelectItem>
                        <SelectItem value="compactado">Compactado</SelectItem>
                        <SelectItem value="ideal">Ideal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Condições Climáticas */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="temperatura">Temperatura (°C)</Label>
                    <Input
                      id="temperatura"
                      type="number"
                      value={formData.temperatura}
                      onChange={(e) => handleChange("temperatura", e.target.value)}
                      placeholder="Ex: 22"
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
                      placeholder="Ex: 60"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vento">Velocidade do Vento (km/h)</Label>
                    <Input
                      id="vento"
                      type="number"
                      step="0.1"
                      value={formData.vento}
                      onChange={(e) => handleChange("vento", e.target.value)}
                      placeholder="Ex: 5.5"
                      required
                    />
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Técnicas</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleChange("observacoes", e.target.value)}
                    placeholder="Registre informações sobre uniformidade da aplicação, condições especiais, recomendações..."
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

export default Solido;